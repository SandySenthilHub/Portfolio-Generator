import React, { useState } from 'react';
import { Education } from '../../types/portfolio';
import { Plus, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface EducationFormProps {
  education: Education[];
  updateEducation: (education: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ education, updateEducation }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<Omit<Education, 'id'>>({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const resetForm = () => {
    setFormData({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };
  
  const handleAddEducation = () => {
    // Validate form
    if (!formData.institution || !formData.degree || !formData.startDate) {
      return; // Basic validation
    }
    
    const newEducation: Education = {
      id: Date.now().toString(),
      ...formData,
    };
    
    updateEducation([...education, newEducation]);
    resetForm();
    setIsAdding(false);
  };
  
  const handleEditEducation = () => {
    if (!isEditing) return;
    
    updateEducation(
      education.map((edu) =>
        edu.id === isEditing ? { ...edu, ...formData } : edu
      )
    );
    
    resetForm();
    setIsEditing(null);
  };
  
  const handleRemoveEducation = (id: string) => {
    updateEducation(education.filter((edu) => edu.id !== id));
  };
  
  const startEditing = (edu: Education) => {
    setFormData({
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field,
      startDate: edu.startDate,
      endDate: edu.endDate,
      description: edu.description,
    });
    setIsEditing(edu.id);
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
        Add your educational background, including degrees, certifications, and courses.
      </p>
      
      {!isAdding && !isEditing && (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-600 dark:hover:border-indigo-400 transition-colors duration-200 flex items-center justify-center"
        >
          <Plus size={18} className="mr-2" />
          Add Education
        </button>
      )}
      
      {(isAdding || isEditing) && (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">
            {isAdding ? 'Add New Education' : 'Edit Education'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="institution" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Institution
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="University or School Name"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="degree" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Degree
                </label>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Bachelor's, Master's, Certificate, etc."
                />
              </div>
              
              <div>
                <label htmlFor="field" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Field of Study
                </label>
                <input
                  type="text"
                  id="field"
                  name="field"
                  value={formData.field}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Computer Science, Business, etc."
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
                <input
                  type="month"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Notable achievements, relevant coursework, etc."
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
                onClick={isEditing ? handleEditEducation : handleAddEducation}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors duration-200"
              >
                {isEditing ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {education.length > 0 && (
        <div className="mt-8 space-y-6">
          <h3 className="text-lg font-medium">Education History</h3>
          
          {education.map((edu) => {
            const isExpandable = edu.description && edu.description.length > 100;
            const isItemExpanded = expanded.includes(edu.id);
            
            return (
              <div 
                key={edu.id} 
                className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-lg">{edu.institution}</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                    </p>
                  </div>
                  
                  <div className="flex space-x-1">
                    <button
                      onClick={() => startEditing(edu)}
                      className="p-1.5 text-gray-500 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      aria-label="Edit education"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleRemoveEducation(edu.id)}
                      className="p-1.5 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      aria-label="Remove education"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                {edu.description && (
                  <div className="mt-2">
                    <p className={`text-gray-700 dark:text-gray-300 whitespace-pre-line ${
                      isExpandable && !isItemExpanded ? 'line-clamp-2' : ''
                    }`}>
                      {edu.description}
                    </p>
                    
                    {isExpandable && (
                      <button
                        onClick={() => toggleExpand(edu.id)}
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
                )}
              </div>
            );
          })}
        </div>
      )}
      
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-medium text-blue-800 dark:text-blue-300">Tips for Education Section</h4>
        <ul className="mt-2 text-sm text-blue-700 dark:text-blue-400 list-disc list-inside space-y-1">
          <li>List your most recent education first</li>
          <li>Include relevant certificates and coursework</li>
          <li>Mention academic achievements, honors, and relevant extracurricular activities</li>
          <li>For recent graduates, include GPA if it strengthens your profile</li>
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

export default EducationForm;