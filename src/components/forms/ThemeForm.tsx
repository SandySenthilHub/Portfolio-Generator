import React from 'react';
import { useTheme } from '../../context/ThemeProvider';
import { Moon, Sun, Check } from 'lucide-react';

const ThemeForm: React.FC = () => {
  const { theme, updateTheme, toggleDarkMode } = useTheme();
  
  const colorOptions = [
    { name: 'Indigo', value: 'indigo' },
    { name: 'White', value: '#ffffff' },
    { name: 'Teal', value: 'teal' },
    { name: 'Amber', value: 'amber' },
    { name: 'Emerald', value: 'emerald' },
    { name: 'Purple', value: 'purple' },
  ];

  const fontOptions = [
    { name: 'Sans Serif', value: 'sans' },
    { name: 'Serif', value: 'serif' },
    { name: 'Monospace', value: 'mono' },
  ];

  const fontSizeOptions = [
    { name: 'Small', value: 'small' },
    { name: 'Medium', value: 'medium' },
    { name: 'Large', value: 'large' },
  ];
  
  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h3 className="text-lg font-medium mb-4">Color Theme</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {colorOptions.map((color) => (
            <button
              key={color.value}
              onClick={() => updateTheme({ primaryColor: color.value })}
              className={`relative w-full aspect-square rounded-lg transition-all duration-200 ${
                theme.primaryColor === color.value
                  ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-500'
                  : ''
              }`}
              style={{
                backgroundColor: `var(--color-${color.value}-600)`,
              }}
              aria-label={`Select ${color.name} theme`}
            >
              {theme.primaryColor === color.value && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check className="text-white" size={24} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Font Family</h3>
        <div className="flex flex-wrap gap-3">
          {fontOptions.map((font) => (
            <button
              key={font.value}
              onClick={() => updateTheme({ fontFamily: font.value })}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                theme.fontFamily === font.value
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              style={{
                fontFamily:
                  font.value === 'sans'
                    ? 'ui-sans-serif, system-ui, sans-serif'
                    : font.value === 'serif'
                    ? 'ui-serif, Georgia, serif'
                    : 'ui-monospace, SFMono-Regular, monospace',
              }}
            >
              {font.name}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Font Size</h3>
        <div className="flex flex-wrap gap-3">
          {fontSizeOptions.map((size) => (
            <button
              key={size.value}
              onClick={() => updateTheme({ fontSize: size.value })}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                theme.fontSize === size.value
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              style={{
                fontSize:
                  size.value === 'small'
                    ? '0.875rem'
                    : size.value === 'medium'
                    ? '1rem'
                    : '1.125rem',
              }}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Color Mode</h3>
        <button
          onClick={toggleDarkMode}
          className="flex items-center justify-between w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <span className="flex items-center">
            {theme.darkMode ? (
              <>
                <Moon size={20} className="mr-3 text-indigo-600 dark:text-indigo-400" />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <Sun size={20} className="mr-3 text-amber-500" />
                <span>Light Mode</span>
              </>
            )}
          </span>
          
          <div
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
              theme.darkMode ? 'bg-indigo-600' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                theme.darkMode ? 'transform translate-x-6' : ''
              }`}
            ></div>
          </div>
        </button>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-medium text-blue-800 dark:text-blue-300">Preview Your Portfolio</h4>
        <p className="mt-2 text-sm text-blue-700 dark:text-blue-400">
          The preview on the right shows how your portfolio will look with the current theme settings.
          Experiment with different colors, fonts, and sizes to find the perfect look for your portfolio.
        </p>
      </div>
    </div>
  );
};

export default ThemeForm;