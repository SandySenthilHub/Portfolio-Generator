import React, { useState } from 'react';
import { Project } from '../../types/portfolio';
import { Plus, Edit2, Trash2, ExternalLink, Github, Image } from 'lucide-react';

interface ProjectsFormProps {
  projects: Project[];
  updateProjects: (projects: Project[]) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ projects, updateProjects }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    technologies: [],
    imageUrl: '',
    liveUrl: '',
    githubUrl: '',
  });
  
  const [techInput, setTechInput] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleAddTech = () => {
    if (!techInput.trim()) return;
    
    setFormData({
      ...formData,
      technologies: [...formData.technologies, techInput.trim()],
    });
    
    setTechInput('');
  };
  
  const handleRemoveTech = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };
  
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      technologies: [],
      imageUrl: '',
      liveUrl: '',
      githubUrl: '',
    });
    
    setTechInput('');
  };
  
  const handleAddProject = () => {
    // Validate form
    if (!formData.title || !formData.description) {
      return; // Basic validation
    }
    
    const newProject: Project = {
      id: Date.now().toString(),
      ...formData,
    };
    
    updateProjects([...projects, newProject]);
    resetForm();
    setIsAdding(false);
  };
  
  const handleEditProject = () => {
    if (!isEditing) return;
    
    updateProjects(
      projects.map((proj) =>
        proj.id === isEditing ? { ...proj, ...formData } : proj
      )
    );
    
    resetForm();
    setIsEditing(null);
  };
  
  const handleRemoveProject = (id: string) => {
    updateProjects(projects.filter((proj) => proj.id !== id));
  };
  
  const startEditing = (proj: Project) => {
    setFormData({
      title: proj.title,
      description: proj.description,
      technologies: proj.technologies,
      imageUrl: proj.imageUrl,
      liveUrl: proj.liveUrl,
      githubUrl: proj.githubUrl,
    });
    
    setIsEditing(proj.id);
    setIsAdding(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTech();
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Add your projects to showcase your work and skills to potential employers.
      </p>
      
      {!isAdding && !isEditing && (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-600 dark:hover:border-indigo-400 transition-colors duration-200 flex items-center justify-center"
        >
          <Plus size={18} className="mr-2" />
          Add Project
        </button>
      )}
      
      {(isAdding || isEditing) && (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">
            {isAdding ? 'Add New Project' : 'Edit Project'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Project Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Project Name"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Describe your project, its purpose, and your role..."
              />
            </div>
            
            <div>
              <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Technologies Used
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="technologies"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="React, Node.js, etc."
                />
                <button
                  type="button"
                  onClick={handleAddTech}
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors duration-200"
                >
                  Add
                </button>
              </div>
              
              {formData.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(tech)}
                        className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 focus:outline-none"
                        aria-label={`Remove ${tech}`}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Project Image URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Image size={16} className="text-gray-400" />
                </div>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="w-full pl-10 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="https://example.com/project-image.jpg"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Add a URL to a screenshot or preview image of your project
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Live Demo URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <ExternalLink size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="url"
                    id="liveUrl"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                    className="w-full pl-10 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="https://your-project-demo.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  GitHub Repository
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Github size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="url"
                    id="githubUrl"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    className="w-full pl-10 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setIsAdding(false);
                  setIsEditing(null);
                }}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={isEditing ? handleEditProject : handleAddProject}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors duration-200"
              >
                {isEditing ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {projects.length > 0 && (
        <div className="mt-8 space-y-6">
          <h3 className="text-lg font-medium">Projects</h3>
          
          <div className="grid grid-cols-1 gap-6">
            {projects.map((proj) => (
              <div 
                key={proj.id} 
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                {proj.imageUrl && (
                  <div className="h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Project+Preview';
                      }}
                    />
                  </div>
                )}
                
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-lg">{proj.title}</h4>
                    
                    <div className="flex space-x-1">
                      <button
                        onClick={() => startEditing(proj)}
                        className="p-1.5 text-gray-500 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        aria-label="Edit project"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleRemoveProject(proj.id)}
                        className="p-1.5 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        aria-label="Remove project"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    {proj.description}
                  </p>
                  
                  {proj.technologies.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {proj.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-4 flex space-x-3">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200"
                      >
                        <ExternalLink size={14} className="mr-1.5" />
                        Live Demo
                      </a>
                    )}
                    
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-gray-800 hover:bg-gray-900 text-white dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        <Github size={14} className="mr-1.5" />
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-medium text-blue-800 dark:text-blue-300">Tips for Project Showcase</h4>
        <ul className="mt-2 text-sm text-blue-700 dark:text-blue-400 list-disc list-inside space-y-1">
          <li>Highlight your most impressive and relevant projects</li>
          <li>Include projects that demonstrate a variety of skills</li>
          <li>Add clear screenshots or images to showcase the visual aspects</li>
          <li>Provide detailed descriptions of your role and the technologies used</li>
          <li>Include links to both live demos and source code when available</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectsForm;