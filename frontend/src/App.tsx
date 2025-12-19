import React, { useState, useEffect } from 'react';
import { Project, CreateProjectDTO, UpdateProjectDTO, ProjectStatus } from './types/project';
import projectApi from './services/projectApi';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import Modal from './components/Modal';
import Button from './components/Button';
import Toast from './components/Toast';

// Toast notification interface
interface ToastNotification {
  message: string;
  type: 'success' | 'error' | 'info';
}

function App() {
  // State management for projects and UI
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);
  const [toast, setToast] = useState<ToastNotification | null>(null);
  
  // Filter and search state (Bonus features)
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'All'>('All');

  // Fetch all projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Apply filters whenever projects, search, or filter changes
  useEffect(() => {
    applyFilters();
  }, [projects, searchQuery, statusFilter]);

  /**
   * Fetch all projects from the API
   */
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectApi.getAllProjects();
      setProjects(data);
    } catch (error) {
      showToast('Failed to fetch projects', 'error');
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Apply search and filter to projects (Bonus feature)
   */
  const applyFilters = () => {
    let filtered = [...projects];

    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter((project) => project.status === statusFilter);
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(query) ||
          (project.description && project.description.toLowerCase().includes(query))
      );
    }

    setFilteredProjects(filtered);
  };

  /**
   * Show toast notification (Bonus feature)
   */
  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  /**
   * Open modal for creating new project
   */
  const handleCreateClick = () => {
    setEditingProject(undefined);
    setIsModalOpen(true);
  };

  /**
   * Open modal for editing existing project
   */
  const handleEditClick = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  /**
   * Close modal and reset editing state
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(undefined);
  };

  /**
   * Handle form submission for create/update
   */
  const handleFormSubmit = async (data: CreateProjectDTO | UpdateProjectDTO) => {
    try {
      if (editingProject) {
        // Update existing project
        await projectApi.updateProject(editingProject.id, data);
        showToast('Project updated successfully', 'success');
      } else {
        // Create new project
        await projectApi.createProject(data as CreateProjectDTO);
        showToast('Project created successfully', 'success');
      }
      
      // Refresh projects list and close modal
      await fetchProjects();
      handleCloseModal();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Operation failed';
      showToast(errorMessage, 'error');
      console.error('Error saving project:', error);
    }
  };

  /**
   * Handle project deletion with confirmation
   */
  const handleDelete = async (id: number) => {
    // Confirm deletion
    const confirmed = window.confirm('Are you sure you want to delete this project?');
    if (!confirmed) return;

    try {
      await projectApi.deleteProject(id);
      showToast('Project deleted successfully', 'success');
      await fetchProjects();
    } catch (error) {
      showToast('Failed to delete project', 'error');
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Hasthiya Project Tracker</h1>
              <p className="text-blue-100 text-sm mt-1">Manage your projects efficiently</p>
            </div>
            <Button onClick={handleCreateClick} variant="success">
              + New Project
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filter Section (Bonus feature) */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search Input */}
            <div>
              <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">
                Search Projects
              </label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or description..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="filter" className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                id="filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ProjectStatus | 'All')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="All">All Projects</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Loading projects...</p>
          </div>
        ) : (
          // Project List
          <ProjectList
            projects={filteredProjects}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        )}
      </main>

      {/* Modal for Create/Edit Project */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingProject ? 'Edit Project' : 'Create New Project'}
      >
        <ProjectForm
          project={editingProject}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>

      {/* Toast Notification (Bonus feature) */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
