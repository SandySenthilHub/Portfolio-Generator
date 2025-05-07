import React, { useState } from 'react';
import { FormStep, PortfolioData } from '../types/portfolio';
import PersonalForm from './forms/PersonalForm';
import SkillsForm from './forms/SkillsForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import ProjectsForm from './forms/ProjectsForm';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CenteredAlert from './CenteredAlert';

interface PortfolioFormProps {
  portfolioData: PortfolioData;
  setPortfolioData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

const PortfolioForm: React.FC<PortfolioFormProps> = ({ portfolioData, setPortfolioData }) => {
  const [currentStep, setCurrentStep] = useState<FormStep>('personal');
  const [showAlert, setShowAlert] = useState(false);

  const steps: FormStep[] = ['personal', 'skills', 'experience', 'education', 'projects'];

  const goToNextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleSubmit = () => {
    console.log('Submitting portfolio data:', portfolioData);
    setShowAlert(true); // show the custom alert
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'personal':
        return (
          <PersonalForm
            personal={portfolioData.personal}
            updatePersonal={(personal) =>
              setPortfolioData((prev) => ({ ...prev, personal }))
            }
          />
        );
      case 'skills':
        return (
          <SkillsForm
            skills={portfolioData.skills}
            updateSkills={(skills) =>
              setPortfolioData((prev) => ({ ...prev, skills }))
            }
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            experience={portfolioData.experience}
            updateExperience={(experience) =>
              setPortfolioData((prev) => ({ ...prev, experience }))
            }
          />
        );
      case 'education':
        return (
          <EducationForm
            education={portfolioData.education}
            updateEducation={(education) =>
              setPortfolioData((prev) => ({ ...prev, education }))
            }
          />
        );
      case 'projects':
        return (
          <ProjectsForm
            projects={portfolioData.projects}
            updateProjects={(projects) =>
              setPortfolioData((prev) => ({ ...prev, projects }))
            }
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = (step: FormStep): string => {
    switch (step) {
      case 'personal': return 'Personal Info';
      case 'skills': return 'Skills';
      case 'experience': return 'Experience';
      case 'education': return 'Education';
      case 'projects': return 'Projects';
      default: return '';
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {getStepTitle(currentStep)}
          </h2>

          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <button
                  key={step}
                  onClick={() => setCurrentStep(step)}
                  className={`flex-1 text-xs uppercase font-medium ${steps.indexOf(currentStep) >= index
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-400'
                    }`}
                >
                  {getStepTitle(step)}
                </button>
              ))}
            </div>

            <div className="relative mt-2">
              <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="absolute h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full transition-all duration-300"
                  style={{
                    width: `${((steps.indexOf(currentStep) + 1) / steps.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Form content */}
          <div className="min-h-[400px]">
            {renderStepContent()}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={goToPreviousStep}
              disabled={currentStep === steps[0]}
              className={`flex items-center px-4 py-2 rounded-md ${currentStep === steps[0]
                  ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
                } transition-colors duration-200`}
            >
              <ChevronLeft size={16} className="mr-1" />
              Previous
            </button>

            {currentStep === 'projects' ? (
              <button
                onClick={handleSubmit}
                className="flex items-center px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white transition-colors duration-200"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={goToNextStep}
                className="flex items-center px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200"
              >
                Next
                <ChevronRight size={16} className="ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>

      {showAlert && (
        <CenteredAlert
        message="🎉 Great job! Your portfolio is ready. You can now preview or download it as a PDF."
        onClose={() => setShowAlert(false)}
        />
      )}
    </>

  );
};

export default PortfolioForm;
