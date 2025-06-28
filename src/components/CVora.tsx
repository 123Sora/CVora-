import React, { useState, useEffect } from 'react';
import { CVForm } from './CVForm';
import { CVPreview } from './CVPreview';
import type { CVData, CVTemplate } from '../types/cv';
import { generatePDF } from '../utils/pdfGenerator';
import { Download, Eye, Edit3, FileText, Palette } from 'lucide-react';
import { useRef } from 'react';

const initialCVData: CVData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    website: '',
    summary: '',
    profilePhoto: ''
  },
  workExperience: [],
  education: [],
  volunteering: [],
  skills: [],
  languages: [],
  references: [],
  socialMedia: [],
  hobbies: [],
  projects: []
};

const templates: { id: CVTemplate; name: string; description: string }[] = [
  { id: 'modern', name: 'Modern', description: 'Clean and contemporary design with blue accents' },
  { id: 'classic', name: 'Classic', description: 'Traditional professional layout with serif fonts' },
  { id: 'creative', name: 'Creative', description: 'Colorful sidebar design with purple gradients' },
  { id: 'minimal', name: 'Minimal', description: 'Clean and simple with lots of white space' },
  { id: 'professional', name: 'Professional', description: 'Corporate style with dark sidebar' },
  { id: 'executive', name: 'Executive', description: 'Sophisticated design for senior positions' },
  { id: 'tech', name: 'Tech', description: 'Modern tech-focused design with code elements' },
  { id: 'academic', name: 'Academic', description: 'Scholarly layout perfect for research positions' },
  { id: 'designer', name: 'Designer', description: 'Creative portfolio-style layout' },
  { id: 'corporate', name: 'Corporate', description: 'Traditional business-focused design' }
];

export const CVora: React.FC = () => {
  const [cvData, setCvData] = useState<CVData>(initialCVData);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [selectedTemplate, setSelectedTemplate] = useState<CVTemplate>('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const resetButtonRef = useRef<HTMLButtonElement>(null);

  const handleResetConfirm = () => {
    setCvData(initialCVData);
    localStorage.removeItem('cvData');
    setShowResetModal(false);
  };

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('cvData');
    const savedTemplate = localStorage.getItem('selectedTemplate');
    
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Ensure all array properties are properly initialized
        setCvData({
          personalInfo: parsedData.personalInfo || initialCVData.personalInfo,
          workExperience: parsedData.workExperience || [],
          education: parsedData.education || [],
          volunteering: parsedData.volunteering || [],
          skills: parsedData.skills || [],
          languages: parsedData.languages || [],
          references: parsedData.references || [],
          socialMedia: parsedData.socialMedia || [],
          hobbies: parsedData.hobbies || [],
          projects: parsedData.projects || []
        });
      } catch (error) {
        console.error('Error loading saved CV data:', error);
      }
    }
    
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate as CVTemplate);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('cvData', JSON.stringify(cvData));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [cvData]);

  useEffect(() => {
    localStorage.setItem('selectedTemplate', selectedTemplate);
  }, [selectedTemplate]);

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    setActiveTab('preview'); // Switch to preview mode
    
    // Wait a bit for the DOM to update
    setTimeout(async () => {
      const success = await generatePDF('cv-preview', `${cvData.personalInfo.fullName || 'CV'}.pdf`);
      setIsGenerating(false);
      
      if (!success) {
        alert('Failed to generate PDF. Please try again.');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">CVora</h1>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Tab Switcher */}
              <div className="hidden sm:flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('edit')}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md transition-all duration-200 text-sm ${
                    activeTab === 'edit'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Edit3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md transition-all duration-200 text-sm ${
                    activeTab === 'preview'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">Preview</span>
                </button>
              </div>

              {/* Mobile Tab Switcher */}
              <div className="sm:hidden">
                <button
                  onClick={() => setActiveTab(activeTab === 'edit' ? 'preview' : 'edit')}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                >
                  {activeTab === 'edit' ? <Eye className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                  {activeTab === 'edit' ? 'Preview' : 'Edit'}
                </button>
              </div>

                 {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  ref={resetButtonRef}
                  onClick={() => setShowResetModal(true)}
                  className="hidden sm:block px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 text-sm"
                >
                  Reset
                </button>
                <button
                  onClick={handleGeneratePDF}
                  disabled={isGenerating || !cvData.personalInfo.fullName}
                  className="flex items-center gap-2 px-3 sm:px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">{isGenerating ? 'Generating...' : 'Download PDF'}</span>
                  <span className="sm:hidden">{isGenerating ? '...' : 'PDF'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reset All Data?</h3>
            <p className="text-gray-700 mb-4">Are you sure you want to reset all data? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleResetConfirm}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {activeTab === 'edit' ? (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 sm:mb-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Create Your Professional CV</h2>
              <p className="text-gray-600 text-sm sm:text-base">Fill in your information to generate a beautiful, professional resume</p>
            </div>
            <CVForm cvData={cvData} setCvData={setCvData} />
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">CV Preview</h2>
              <p className="text-gray-600 text-sm sm:text-base">Choose a template and see how your CV will look when downloaded as PDF</p>
            </div>
            
            {/* Template Selector */}
            <div className="max-w-6xl mx-auto mb-6 sm:mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">Choose Template</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">{template.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{template.description}</p>
                  </button>
                ))}
              </div>
            </div>
            
            <CVPreview cvData={cvData} selectedTemplate={selectedTemplate} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-8 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center text-gray-600 text-sm">
            <p>
              {` ${new Date().toLocaleTimeString()} `}
              &copy; {new Date().getFullYear()} CVora.  
              Create professional resumes with ease.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};