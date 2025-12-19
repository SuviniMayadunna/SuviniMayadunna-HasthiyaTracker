import React from 'react';
import { Project } from '../types/project';
import ProjectCard from './ProjectCard';

// Props interface for ProjectList component
interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}

/**
 * ProjectList component displays all projects in a responsive grid layout
 * Handles empty state when no projects are available
 */
const ProjectList: React.FC<ProjectListProps> = ({ projects, onEdit, onDelete }) => {
  // Display message when no projects exist
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg
            className="mx-auto h-16 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Projects Yet</h3>
        <p className="text-gray-500">Create your first project to get started!</p>
      </div>
    );
  }

  // Display projects in responsive grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProjectList;
