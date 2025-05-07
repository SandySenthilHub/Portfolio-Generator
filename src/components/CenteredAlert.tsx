import React from 'react';

interface CenteredAlertProps {
  message: string;
  onClose: () => void;
}

const CenteredAlert: React.FC<CenteredAlertProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg p-6 w-[90%] max-w-md text-center">
        <p className="mb-4 text-lg font-medium">{message}</p>
        <button
          onClick={onClose}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default CenteredAlert;
