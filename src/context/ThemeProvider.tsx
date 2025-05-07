import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeOptions } from '../types/portfolio';

interface ThemeContextType {
  theme: ThemeOptions;
  updateTheme: (newTheme: Partial<ThemeOptions>) => void;
  toggleDarkMode: () => void;
}

const defaultTheme: ThemeOptions = {
  primaryColor: 'indigo',
  fontFamily: 'sans',
  fontSize: 'medium',
  darkMode: false,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeOptions>(() => {
    const savedTheme = localStorage.getItem('portfolioTheme');
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem('portfolioTheme', JSON.stringify(theme));
    
    // Apply dark mode
    if (theme.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Apply font family
    const root = document.documentElement;
    root.style.setProperty('--font-family', getFontFamily(theme.fontFamily));
    
    // Apply font size
    document.body.className = `text-${theme.fontSize}`;
    root.style.setProperty('--primary-color', theme.primaryColor); // Added line

  }, [theme]);

  const getFontFamily = (family: string): string => {
    switch (family) {
      case 'sans':
        return 'ui-sans-serif, system-ui, sans-serif';
      case 'serif':
        return 'ui-serif, Georgia, serif';
      case 'mono':
        return 'ui-monospace, SFMono-Regular, monospace';
      default:
        return 'ui-sans-serif, system-ui, sans-serif';
    }
  };

  const updateTheme = (newTheme: Partial<ThemeOptions>) => {
    setTheme((prevTheme) => ({ ...prevTheme, ...newTheme }));
  };

  const toggleDarkMode = () => {
    setTheme((prevTheme) => ({ ...prevTheme, darkMode: !prevTheme.darkMode }));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;