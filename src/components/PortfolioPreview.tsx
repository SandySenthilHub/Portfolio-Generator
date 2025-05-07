import React from 'react';
import { PortfolioData } from '../types/portfolio';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';

interface PortfolioPreviewProps {
  portfolioData: PortfolioData;
}

const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ portfolioData }) => {
  const { personal, skills, experience, education, projects } = portfolioData;

  // If there's no data, show a placeholder message
  if (!personal.name) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Portfolio Preview</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Fill out the form on the left to see your portfolio preview here.
          </p>
          <div className="w-full h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">Preview will appear here</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200 mb-8">
      {/* Header Section */}
      <div
        className={`p-8 bg-white-600  rounded-t-lg`}
      >
        <h1 className="text-3xl font-bold">{personal.name || 'Your Name'}</h1>
        <p className="text-xl mt-2">{personal.title || 'Your Title'}</p>

        <div className="mt-6 space-y-2">
          {personal.bio && (
            <p className="leading-relaxed">{personal.bio}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          {personal.email && (
            <a href={`mailto:${personal.email}`} className="flex items-center  hover:font-bold transition-colors">
              <Mail size={16} className="mr-2" /> {personal.email}
            </a>
          )}

          {personal.phone && (
            <a href={`tel:${personal.phone}`} className="flex items-center  hover:font-bold transition-colors">
              <Phone size={16} className="mr-2" /> {personal.phone}
            </a>
          )}

          {personal.location && (
            <div className="flex items-center">
              <MapPin size={16} className="mr-2" /> {personal.location}
            </div>
          )}
        </div>

        <div className="flex space-x-4 mt-6">
          {personal.social.github && (
            <a
              href={personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:font-bold transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          )}

          {personal.social.linkedin && (
            <a
              href={personal.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:font-bold transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          )}

          {personal.social.twitter && (
            <a
              href={personal.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:font-bold transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          )}

          {personal.website && (
            <a
              href={personal.website}
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:font-bold transition-colors"
              aria-label="Personal Website"
            >
              <Globe size={20} />
            </a>
          )}
        </div>
      </div>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="p-8 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-2xl font-bold mb-6 text-black-600 dark:text-black-400`}>
            Skills
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div key={skill.id} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {getSkillLevelText(skill.level)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gray-600 dark:bg-gray-500 h-2 rounded-full"
                    style={{ width: `${skill.level * 20}%` }}
                  ></div>

                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className="p-8 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-2xl font-bold mb-6 text-600 dark:text-400`}>
            Experience
          </h2>

          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id} className="relative pl-6 pb-6 border-l-2 border-gray-200 dark:border-gray-700 last:pb-0">
                <div className="absolute top-0 left-[-9px] w-4 h-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-full"></div>

                <div>
                  <h3 className="text-xl font-medium">{exp.position}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">{exp.company}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    {formatDate(exp.startDate)} - {exp.isCurrentRole ? 'Present' : formatDate(exp.endDate)}
                  </p>

                  {exp.description && (
                    <p className="mt-3 text-gray-600 dark:text-gray-400 whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="p-8 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-2xl font-bold mb-6 text-600 dark:text-400`}>
            Education
          </h2>

          <div className="space-y-8">
            {education.map((edu) => (
              <div key={edu.id} className="relative pl-6 pb-6 border-l-2 border-gray-200 dark:border-gray-700 last:pb-0">
                <div className="absolute top-0 left-[-9px] w-4 h-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-full"></div>

                <div>
                  <h3 className="text-xl font-medium">{edu.institution}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                  </p>

                  {edu.description && (
                    <p className="mt-3 text-gray-600 dark:text-gray-400 whitespace-pre-line">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="p-8">
          <h2 className={`text-2xl font-bold mb-6 text-600 dark:text-400`}>
            Projects
          </h2>

          <div className="grid grid-cols-1 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {project.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Project+Preview';
                      }}
                    />
                  </div>
                )}

                <div className="p-4">
                  <h3 className="text-xl font-medium">{project.title}</h3>

                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>

                  {project.technologies.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-100 dark:bg-900 text-800 dark:text-200`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex space-x-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-600 hover:bg-700  transition-colors duration-200`}
                      >
                        <ExternalLink size={14} className="mr-1.5" />
                        Live Demo
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-gray-800 hover:bg-gray-900  dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
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
        </section>
      )}
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

const formatDate = (dateString: string): string => {
  if (!dateString) return '';

  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export default PortfolioPreview;