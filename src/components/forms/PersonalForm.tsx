import React from 'react';
import { PersonalInfo } from '../../types/portfolio';
import { User, Briefcase, Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter } from 'lucide-react';

interface PersonalFormProps {
  personal: PersonalInfo;
  updatePersonal: (personal: PersonalInfo) => void;
}

const PersonalForm: React.FC<PersonalFormProps> = ({ personal, updatePersonal }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      updatePersonal({
        ...personal,
        [parent]: {
          ...personal[parent as keyof PersonalInfo],
          [child]: value,
        },
      });
    } else {
      updatePersonal({
        ...personal,
        [name]: value,
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <User size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={personal.name}
              onChange={handleChange}
              className="block w-full pl-10 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Professional Title
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Briefcase size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              id="title"
              name="title"
              value={personal.title}
              onChange={handleChange}
              className="block w-full pl-10 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Full Stack Developer"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Professional Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={personal.bio}
          onChange={handleChange}
          rows={4}
          className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          placeholder="A brief professional summary highlighting your expertise and career focus..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail size={16} className="text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={personal.email}
              onChange={handleChange}
              className="block w-full pl-10 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="john.doe@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Phone size={16} className="text-gray-400" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={personal.phone}
              onChange={handleChange}
              className="block w-full pl-10 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="+1 (123) 456-7890"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Location
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MapPin size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              id="location"
              name="location"
              value={personal.location}
              onChange={handleChange}
              className="block w-full pl-10 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="San Francisco, CA"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Personal Website
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Globe size={16} className="text-gray-400" />
            </div>
            <input
              type="url"
              id="website"
              name="website"
              value={personal.website}
              onChange={handleChange}
              className="block w-full pl-10 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="https://johndoe.com"
            />
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
        Social Profiles
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label htmlFor="github" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            GitHub
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Github size={16} className="text-gray-400" />
            </div>
            <input
              type="url"
              id="github"
              name="social.github"
              value={personal.social.github}
              onChange={handleChange}
              className="block w-full pl-10 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="https://github.com/username"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            LinkedIn
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Linkedin size={16} className="text-gray-400" />
            </div>
            <input
              type="url"
              id="linkedin"
              name="social.linkedin"
              value={personal.social.linkedin}
              onChange={handleChange}
              className="block w-full pl-10 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Twitter
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Twitter size={16} className="text-gray-400" />
            </div>
            <input
              type="url"
              id="twitter"
              name="social.twitter"
              value={personal.social.twitter}
              onChange={handleChange}
              className="block w-full pl-10 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="https://twitter.com/username"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalForm;