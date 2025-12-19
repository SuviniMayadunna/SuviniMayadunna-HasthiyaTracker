import { Request, Response } from 'express';
import pool from '../config/database';
import { CreateProjectDTO, UpdateProjectDTO, Project, ProjectStatus } from '../types/project';
import { RowDataPacket, ResultSetHeader } from 'mysql2';


//Get all projects from the database
export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM projects ORDER BY created_at DESC'
    );
    
    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects',
    });
  }
};

//Get a single project by ID
export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM projects WHERE id = ?',
      [id]
    );
    
    if (rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Project not found',
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project',
    });
  }
};

//Create a new project
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, status, due_date }: CreateProjectDTO = req.body;
    
    // Validation: name and due_date are mandatory
    if (!name || !name.trim()) {
      res.status(400).json({
        success: false,
        message: 'Project name is required',
      });
      return;
    }
    
    if (!due_date) {
      res.status(400).json({
        success: false,
        message: 'Due date is required',
      });
      return;
    }
    
    // Validate due_date format (basic check)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(due_date)) {
      res.status(400).json({
        success: false,
        message: 'Invalid date format. Use YYYY-MM-DD',
      });
      return;
    }
    
    // Insert project into database
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO projects (name, description, status, due_date) VALUES (?, ?, ?, ?)',
      [name.trim(), description || null, status || 'Pending', due_date]
    );
    
    // Fetch the created project
    const [newProject] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM projects WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject[0],
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project',
    });
  }
};

//Update an existing project
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, status, due_date }: UpdateProjectDTO = req.body;
    
    // Check if project exists
    const [existing] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM projects WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Project not found',
      });
      return;
    }
    
    // Build dynamic update query based on provided fields
    const updates: string[] = [];
    const values: any[] = [];
    
    if (name !== undefined) {
      if (!name.trim()) {
        res.status(400).json({
          success: false,
          message: 'Project name cannot be empty',
        });
        return;
      }
      updates.push('name = ?');
      values.push(name.trim());
    }
    
    if (description !== undefined) {
      updates.push('description = ?');
      values.push(description || null);
    }
    
    if (status !== undefined) {
      updates.push('status = ?');
      values.push(status);
    }
    
    if (due_date !== undefined) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(due_date)) {
        res.status(400).json({
          success: false,
          message: 'Invalid date format. Use YYYY-MM-DD',
        });
        return;
      }
      updates.push('due_date = ?');
      values.push(due_date);
    }
    
    if (updates.length === 0) {
      res.status(400).json({
        success: false,
        message: 'No fields to update',
      });
      return;
    }
    
    values.push(id);
    
    await pool.query(
      `UPDATE projects SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    
    // Fetch updated project
    const [updatedProject] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM projects WHERE id = ?',
      [id]
    );
    
    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject[0],
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project',
    });
  }
};

//Delete a project by ID
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Check if project exists
    const [existing] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM projects WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Project not found',
      });
      return;
    }
    
    await pool.query('DELETE FROM projects WHERE id = ?', [id]);
    
    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project',
    });
  }
};
