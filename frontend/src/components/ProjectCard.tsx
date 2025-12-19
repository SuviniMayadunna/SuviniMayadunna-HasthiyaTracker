import React from 'react';
import { Project, ProjectStatus } from '../types/project';

// Props interface for ProjectCard component
interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}

/**
 * ProjectCard component displays individual project information in a card layout
 * Shows project name, description, status, and due date with action buttons
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  // Get color styling based on project status
  const getStatusColor = (status: ProjectStatus): string => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date to readable format
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Check if project is overdue
  const isOverdue = (): boolean => {
    const today = new Date();
    const dueDate = new Date(project.due_date);
    return dueDate < today && project.status !== 'Completed';
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-1 ${
      isOverdue() ? 'border-2 border-red-500' : 'border border-gray-100'
    }`}>
      {/* Project name and status */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex-1">{project.name}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
            project.status
          )}`}
        >
          {project.status}
        </span>
      </div>

      {/* Project description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {project.description || 'No description provided'}
      </p>

      {/* Due date with overdue indicator */}
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Due Date:</span>{' '}
          <span className={isOverdue() ? 'text-red-600 font-semibold' : ''}>
            {formatDate(project.due_date)}
          </span>
          {isOverdue() && <span className="ml-2 text-red-600">(Overdue)</span>}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex space-x-3">
        <button
          onClick={() => onEdit(project)}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(project.id)}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
