import React, { useState, useEffect } from 'react';
import { Project, CreateProjectDTO, UpdateProjectDTO, ProjectStatus } from '../types/project';
import Button from './Button';

// Props interface for ProjectForm component
interface ProjectFormProps {
  project?: Project; // Optional: if editing existing project
  onSubmit: (data: CreateProjectDTO | UpdateProjectDTO) => void;
  onCancel: () => void;
}

/**
 * ProjectForm component for creating and editing projects
 * Includes comprehensive validation for all fields
 */
const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSubmit, onCancel }) => {
  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Pending' as ProjectStatus,
    due_date: '',
  });

  // Validation errors state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Initialize form with project data if editing
  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description || '',
        status: project.status,
        due_date: project.due_date,
      });
    }
  }, [project]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Validate project name (required)
    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Project name must be at least 3 characters';
    }

    // Validate due date (required)
    if (!formData.due_date) {
      newErrors.due_date = 'Due date is required';
    } else {
      // Check if date is valid format
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(formData.due_date)) {
        newErrors.due_date = 'Invalid date format';
      } else {
        // Check if date is not in the past (only for new projects)
        if (!project) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const selectedDate = new Date(formData.due_date);
          if (selectedDate < today) {
            newErrors.due_date = 'Due date cannot be in the past';
          }
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Prepare data (exclude empty description)
      const submitData = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        status: formData.status,
        due_date: formData.due_date,
      };
      onSubmit(submitData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Project Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
          Project Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter project name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Project Description Field */}
      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          placeholder="Enter project description (optional)"
        />
      </div>

      {/* Project Status Field */}
      <div>
        <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-1">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Due Date Field */}
      <div>
        <label htmlFor="due_date" className="block text-sm font-semibold text-gray-700 mb-1">
          Due Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="due_date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
            errors.due_date ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.due_date && <p className="text-red-500 text-sm mt-1">{errors.due_date}</p>}
      </div>

      {/* Form Action Buttons */}
      <div className="flex space-x-3 pt-4">
        <Button type="submit" variant="primary" className="flex-1">
          {project ? 'Update Project' : 'Create Project'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
