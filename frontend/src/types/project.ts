// Project status type - matches backend ENUM values
export type ProjectStatus = 'Pending' | 'In Progress' | 'Completed';

// Main project interface matching database schema
export interface Project {
  id: number;
  name: string;
  description: string | null;
  status: ProjectStatus;
  due_date: string; // Format: YYYY-MM-DD
  created_at: string;
}

// DTO for creating a new project (no id or created_at)
export interface CreateProjectDTO {
  name: string;
  description?: string;
  status?: ProjectStatus;
  due_date: string;
}

// DTO for updating an existing project (all fields optional)
export interface UpdateProjectDTO {
  name?: string;
  description?: string;
  status?: ProjectStatus;
  due_date?: string;
}

// API response wrapper interface
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
