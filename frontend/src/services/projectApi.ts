import axios from 'axios';
import { Project, CreateProjectDTO, UpdateProjectDTO, ApiResponse } from '../types/project';

// Base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// API service object containing all project-related API calls
const projectApi = {
  /**
   * Fetch all projects from the backend
   * @returns Promise with array of projects
   */
  getAllProjects: async (): Promise<Project[]> => {
    const response = await apiClient.get<ApiResponse<Project[]>>('/projects');
    return response.data.data || [];
  },

  /**
   * Fetch a single project by ID
   * @param id - Project ID
   * @returns Promise with project data
   */
  getProjectById: async (id: number): Promise<Project> => {
    const response = await apiClient.get<ApiResponse<Project>>(`/projects/${id}`);
    if (!response.data.data) {
      throw new Error('Project not found');
    }
    return response.data.data;
  },

  /**
   * Create a new project
   * @param projectData - Data for the new project
   * @returns Promise with created project
   */
  createProject: async (projectData: CreateProjectDTO): Promise<Project> => {
    const response = await apiClient.post<ApiResponse<Project>>('/projects', projectData);
    if (!response.data.data) {
      throw new Error(response.data.message || 'Failed to create project');
    }
    return response.data.data;
  },

  /**
   * Update an existing project
   * @param id - Project ID
   * @param projectData - Updated project data
   * @returns Promise with updated project
   */
  updateProject: async (id: number, projectData: UpdateProjectDTO): Promise<Project> => {
    const response = await apiClient.put<ApiResponse<Project>>(`/projects/${id}`, projectData);
    if (!response.data.data) {
      throw new Error(response.data.message || 'Failed to update project');
    }
    return response.data.data;
  },

  /**
   * Delete a project
   * @param id - Project ID
   * @returns Promise indicating success
   */
  deleteProject: async (id: number): Promise<void> => {
    await apiClient.delete(`/projects/${id}`);
  },
};

export default projectApi;
