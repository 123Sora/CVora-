import React from 'react';
import type { CVData, CVTemplate } from '../types/cv';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { TechTemplate } from './templates/TechTemplate';
import { AcademicTemplate } from './templates/AcademicTemplate';
import { DesignerTemplate } from './templates/DesignerTemplate';
import { CorporateTemplate } from './templates/CorporateTemplate';

interface CVPreviewProps {
  cvData: CVData;
  selectedTemplate: CVTemplate;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ cvData, selectedTemplate }) => {
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate cvData={cvData} />;
      case 'classic':
        return <ClassicTemplate cvData={cvData} />;
      case 'creative':
        return <CreativeTemplate cvData={cvData} />;
      case 'minimal':
        return <MinimalTemplate cvData={cvData} />;
      case 'professional':
        return <ProfessionalTemplate cvData={cvData} />;
      case 'executive':
        return <ExecutiveTemplate cvData={cvData} />;
      case 'tech':
        return <TechTemplate cvData={cvData} />;
      case 'academic':
        return <AcademicTemplate cvData={cvData} />;
      case 'designer':
        return <DesignerTemplate cvData={cvData} />;
      case 'corporate':
        return <CorporateTemplate cvData={cvData} />;
      default:
        return <ModernTemplate cvData={cvData} />;
    }
  };

  return (
    <div id="cv-preview" className="bg-white shadow-xl rounded-lg overflow-hidden max-w-4xl mx-auto">
      {renderTemplate()}
    </div>
  );
};