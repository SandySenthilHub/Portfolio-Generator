import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeProvider';
import { Moon, Sun, Download, Share2, FileDown } from 'lucide-react';

interface HeaderProps {
  onDownload: () => void;
  onDownloadHTML: () => void;
}

const Header: React.FC<HeaderProps> = ({ onDownload, onDownloadHTML }) => {
  // const { theme, toggleDarkMode } = useTheme();
  const [showSteps, setShowSteps] = useState(false);

  const toggleSteps = () => {
    setShowSteps(prev => !prev);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
            PortfolioGen
          </h1>

          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            {/* <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              onClick={toggleDarkMode}
              aria-label={theme.darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme.darkMode ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-indigo-600" />
              )}
            </button> */}

            {/* PDF Download */}
            <button
              onClick={onDownload}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200"
              aria-label="Download portfolio as PDF"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Download</span>
            </button>

            {/* HTML Download */}
            <button
              onClick={onDownloadHTML}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-md bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
              aria-label="Download portfolio as HTML"
            >
              <FileDown size={16} />
              <span className="hidden sm:inline">Download HTML</span>
            </button>

            {/* Host Steps */}
            <div className="relative">
              <button
                onClick={toggleSteps}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-md bg-teal-600 hover:bg-teal-700 text-white transition-colors duration-200"
                aria-label="Host portfolio"
              >
                <Share2 size={16} />
                <span className="hidden sm:inline">Host</span>
              </button>

              {showSteps && (
               <div className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-50 bg-gray-800 dark:bg-gray-900">
               <div className="w-full sm:w-96 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 mx-4">
                 <h3 className="font-semibold mb-2 text-center sm:text-left">Steps to Host on GitHub:</h3>
                 <ol className="list-decimal list-inside space-y-1">
                   <li>Create a GitHub repo (public).</li>
                   <li>Upload <code>portfolio.html</code>.</li>
                   <li>Rename it to <code>index.html</code>.</li>
                   <li>Go to Settings → Pages → Select "Deploy from branch".</li>
                   <li>Use the link to access your hosted page.</li>
                 </ol>
                 <button
                   onClick={toggleSteps}
                   className="mt-3 text-xs text-indigo-500 hover:underline block mx-auto sm:mx-0"
                 >
                   Close
                 </button>
               </div>
             </div>
             
              


              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
