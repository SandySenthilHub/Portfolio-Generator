import React, { useState } from 'react';
import { Skill } from '../../types/portfolio';
import { Plus, Trash2 } from 'lucide-react';

interface SkillsFormProps {
  skills: Skill[];
  updateSkills: (skills: Skill[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ skills, updateSkills }) => {
  const [newSkill, setNewSkill] = useState<string>('');
  const [newLevel, setNewLevel] = useState<number>(3);

  const handleAddSkill = () => {
    if (newSkill.trim() === '') return;
    
    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.trim(),
      level: newLevel,
    };
    
    updateSkills([...skills, skill]);
    setNewSkill('');
    setNewLevel(3);
  };

  const handleRemoveSkill = (id: string) => {
    updateSkills(skills.filter(skill => skill.id !== id));
  };

  const handleSkillLevelChange = (id: string, level: number) => {
    updateSkills(
      skills.map(skill => 
        skill.id === id ? { ...skill, level } : skill
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Add your technical skills and rate your proficiency level from 1 (beginner) to 5 (expert).
      </p>
      
      <div className="flex space-x-4">
        <div className="flex-1">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a skill (e.g., React, Python, UI Design)"
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div className="w-32">
          <select
            value={newLevel}
            onChange={(e) => setNewLevel(Number(e.target.value))}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          >
            <option value={1}>Beginner</option>
            <option value={2}>Basic</option>
            <option value={3}>Intermediate</option>
            <option value={4}>Advanced</option>
            <option value={5}>Expert</option>
          </select>
        </div>
        
        <button
          onClick={handleAddSkill}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors duration-200 flex items-center"
        >
          <Plus size={16} className="mr-1" />
          Add
        </button>
      </div>
      
      {skills.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            No skills added yet. Add some skills to showcase your expertise.
          </p>
        </div>
      ) : (
        <div className="space-y-4 mt-6">
          <h3 className="text-lg font-medium">Your Skills</h3>
          
          <div className="space-y-3">
            {skills.map((skill) => (
              <div 
                key={skill.id} 
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-all duration-200 hover:shadow-sm"
              >
                <div className="flex-1">
                  <p className="font-medium">{skill.name}</p>
                  <div className="flex mt-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <button
                        key={level}
                        onClick={() => handleSkillLevelChange(skill.id, level)}
                        className={`w-8 h-2 mx-0.5 rounded-full transition-colors duration-200 ${
                          level <= skill.level
                            ? 'bg-indigo-600 dark:bg-indigo-500'
                            : 'bg-gray-200 dark:bg-gray-600'
                        }`}
                        aria-label={`Set ${skill.name} level to ${level}`}
                      ></button>
                    ))}
                    <span className="text-xs ml-2 text-gray-500 dark:text-gray-400">
                      {getSkillLevelText(skill.level)}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleRemoveSkill(skill.id)}
                  className="p-1.5 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  aria-label={`Remove ${skill.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-medium text-blue-800 dark:text-blue-300">Tips for Skills Section</h4>
        <ul className="mt-2 text-sm text-blue-700 dark:text-blue-400 list-disc list-inside space-y-1">
          <li>Include both technical and soft skills relevant to your field</li>
          <li>Be honest about your proficiency levels</li>
          <li>Prioritize skills that are most relevant to the jobs you're targeting</li>
          <li>Include skills mentioned in job descriptions you're interested in</li>
        </ul>
      </div>
    </div>
  );
};

const getSkillLevelText = (level: number): string => {
  switch (level) {
    case 1: return 'Beginner';
    case 2: return 'Basic';
    case 3: return 'Intermediate';
    case 4: return 'Advanced';
    case 5: return 'Expert';
    default: return '';
  }
};

export default SkillsForm;