import React, { useRef, useState } from 'react';
import ThemeProvider from './context/ThemeProvider';
import PortfolioForm from './components/PortfolioForm';
import PortfolioPreview from './components/PortfolioPreview';
import Header from './components/ui/Header';
import { PortfolioData } from './types/portfolio';
import html2pdf from 'html2pdf.js';

function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    personal: {
      name: '',
      title: '',
      bio: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      social: {
        github: '',
        linkedin: '',
        twitter: '',
      },
    },
    skills: [],
    experience: [],
    education: [],
    projects: [],
  });

  const portfolioRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (!portfolioRef.current) return;

    const opt = {
      margin: 0.5,
      filename: 'portfolio.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(portfolioRef.current).save();
  };

  const handleDownloadHTML = () => {
    if (!portfolioRef.current) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Portfolio</title>
          <style>
            body { margin: 0; font-family: Arial, sans-serif; }
          </style>
        </head>
        <body>
          ${portfolioRef.current.innerHTML}
        </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Header onDownload={handleDownloadPDF} onDownloadHTML={handleDownloadHTML} />
        <main className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="md:order-1">
              <PortfolioForm
                portfolioData={portfolioData}
                setPortfolioData={setPortfolioData}
              />
            </div>
            <div
              className="md:order-2 bg-white dark:bg-gray-800 p-4 rounded-md"
              ref={portfolioRef}
            >
              <PortfolioPreview portfolioData={portfolioData} />
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
