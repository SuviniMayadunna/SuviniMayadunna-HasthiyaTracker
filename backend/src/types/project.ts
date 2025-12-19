// Project status type - matches database ENUM
export type ProjectStatus = 'Pending' | 'In Progress' | 'Completed';

// Project interface - represents a project in the database
export interface Project {
  id: number;
  name: string;
  description: string | null;
  status: ProjectStatus;
  due_date: string; 
  created_at: string;
}

// Interface for creating a new project (without id and timestamps)
export interface CreateProjectDTO {
  name: string;
  description?: string;
  status?: ProjectStatus;
  due_date: string;
}

// Interface for updating a project (all fields optional except where validation required)
export interface UpdateProjectDTO {
  name?: string;
  description?: string;
  status?: ProjectStatus;
  due_date?: string;
}
