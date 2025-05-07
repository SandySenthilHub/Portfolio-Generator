import React, { useState } from 'react';
import { Experience } from '../../types/portfolio';
import { Plus, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface ExperienceFormProps {
  experience: Experience[];
  updateExperience: (experience: Experience[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ experience, updateExperience }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<Omit<Experience, 'id'>>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    isCurrentRole: false,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, isCurrentRole: e.target.checked });
  };
  
  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      isCurrentRole: false,
    });
  };
  
  const handleAddExperience = () => {
    // Validate form
    if (!formData.company || !formData.position || !formData.startDate || (!formData.endDate && !formData.isCurrentRole)) {
      return; // Basic validation
    }
    
    const newExperience: Experience = {
      id: Date.now().toString(),
      ...formData,
    };
    
    updateExperience([...experience, newExperience]);
    resetForm();
    setIsAdding(false);
  };
  
  const handleEditExperience = () => {
    if (!isEditing) return;
    
    updateExperience(
      experience.map((exp) =>
        exp.id === isEditing ? { ...exp, ...formData } : exp
      )
    );
    
    resetForm();
    setIsEditing(null);
  };
  
  const handleRemoveExperience = (id: string) => {
    updateExperience(experience.filter((exp) => exp.id !== id));
  };
  
  const startEditing = (exp: Experience) => {
    setFormData({
      company: exp.company,
      position: exp.position,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
      isCurrentRole: exp.isCurrentRole,
    });
    setIsEditing(exp.id);
    setIsAdding(false);
  };
  
  const toggleExpand = (id: string) => {
    if (expanded.includes(id)) {
      setExpanded(expanded.filter((item) => item !== id));
    } else {
      setExpanded([...expanded, id]);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Add your work experience, starting with the most recent position.
      </p>
      
      {!isAdding && !isEditing && (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-600 dark:hover:border-indigo-400 transition-colors duration-200 flex items-center justify-center"
        >
          <Plus size={18} className="mr-2" />
          Add Work Experience
        </button>
      )}
      
      {(isAdding || isEditing) && (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">
            {isAdding ? 'Add New Experience' : 'Edit Experience'}
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Company Name"
                />
              </div>
              
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Job Title"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date
                </label>
                <input
                  type="month"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="month"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    disabled={formData.isCurrentRole}
                    className={`w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white ${
                      formData.isCurrentRole ? 'opacity-50' : ''
                    }`}
                  />
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isCurrentRole"
                      name="isCurrentRole"
                      checked={formData.isCurrentRole}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isCurrentRole" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Current Role
                    </label>
                  </div>
                </div>
              </div>
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
                placeholder="Describe your responsibilities and achievements..."
              />
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
                onClick={isEditing ? handleEditExperience : handleAddExperience}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors duration-200"
              >
                {isEditing ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {experience.length > 0 && (
        <div className="mt-8 space-y-6">
          <h3 className="text-lg font-medium">Experience History</h3>
          
          {experience.map((exp) => {
            const isExpandable = exp.description.length > 100;
            const isItemExpanded = expanded.includes(exp.id);
            
            return (
              <div 
                key={exp.id} 
                className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-lg">{exp.position}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      {formatDate(exp.startDate)} - {exp.isCurrentRole ? 'Present' : formatDate(exp.endDate)}
                    </p>
                  </div>
                  
                  <div className="flex space-x-1">
                    <button
                      onClick={() => startEditing(exp)}
                      className="p-1.5 text-gray-500 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      aria-label="Edit experience"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="p-1.5 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      aria-label="Remove experience"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="mt-2">
                  <p className={`text-gray-700 dark:text-gray-300 whitespace-pre-line ${
                    isExpandable && !isItemExpanded ? 'line-clamp-2' : ''
                  }`}>
                    {exp.description}
                  </p>
                  
                  {isExpandable && (
                    <button
                      onClick={() => toggleExpand(exp.id)}
                      className="mt-1 text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center"
                    >
                      {isItemExpanded ? (
                        <>
                          Show less <ChevronUp size={16} className="ml-1" />
                        </>
                      ) : (
                        <>
                          Show more <ChevronDown size={16} className="ml-1" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-medium text-blue-800 dark:text-blue-300">Tips for Work Experience</h4>
        <ul className="mt-2 text-sm text-blue-700 dark:text-blue-400 list-disc list-inside space-y-1">
          <li>Focus on achievements rather than just listing responsibilities</li>
          <li>Use action verbs to describe your contributions</li>
          <li>Include quantifiable results when possible (e.g., "Increased sales by 20%")</li>
          <li>Highlight skills and experiences relevant to your target position</li>
        </ul>
      </div>
    </div>
  );
};

const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export default ExperienceForm;