import React from 'react';
import type { CVData } from '../../types/cv';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ClassicTemplateProps {
  cvData: CVData;
}

export const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ cvData }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-white p-8 font-serif">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
        <div className="flex items-center justify-center gap-6 mb-4">
          {cvData.personalInfo.profilePhoto && (
            <img
              src={cvData.personalInfo.profilePhoto}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-2 border-gray-300"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{cvData.personalInfo.fullName || 'Your Name'}</h1>
          </div>
        </div>
        <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600">
          {cvData.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{cvData.personalInfo.email}</span>
            </div>
          )}
          {cvData.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{cvData.personalInfo.phone}</span>
            </div>
          )}
          {cvData.personalInfo.address && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{cvData.personalInfo.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {cvData.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">{cvData.personalInfo.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {cvData.workExperience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
            Professional Experience
          </h2>
          {cvData.workExperience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{exp.jobTitle}</h3>
                  <p className="text-gray-600 font-medium">{exp.company}, {exp.location}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>{formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}</p>
                </div>
              </div>
              {exp.bulletPoints.length > 0 && exp.bulletPoints[0] && (
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-2 space-y-1 ml-4">
                  {exp.bulletPoints.filter(point => point.trim()).map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              )}
              {exp.description && (
                <p className="text-gray-700 leading-relaxed mt-2">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {cvData.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
            Education
          </h2>
          {cvData.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}, {edu.location}</p>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>{formatDate(edu.graduationDate)}</p>
                </div>
              </div>
              {edu.description && (
                <p className="text-gray-700 leading-relaxed mt-2">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {cvData.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
            Core Competencies
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {['Technical', 'Soft Skills', 'Tools', 'Languages'].map(category => {
              const categorySkills = cvData.skills.filter(skill => skill.category === category);
              if (categorySkills.length === 0) return null;
              
              return (
                <div key={category}>
                  <h4 className="font-semibold text-gray-800 mb-2">{category}:</h4>
                  <p className="text-gray-700 text-sm">
                    {categorySkills.map(skill => skill.name).join(', ')}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Languages */}
      {cvData.languages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
            Languages
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {cvData.languages.map((language) => (
              <div key={language.id} className="flex justify-between">
                <span className="text-gray-800">{language.name}</span>
                <span className="text-gray-600 text-sm">{language.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional sections in a more compact format for classic style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Projects */}
        {cvData.projects.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
              Notable Projects
            </h2>
            {cvData.projects.map((project) => (
              <div key={project.id} className="mb-4">
                <h4 className="font-semibold text-gray-800">{project.name}</h4>
                {project.technologies && (
                  <p className="text-sm text-gray-600 italic">{project.technologies}</p>
                )}
                {project.description && (
                  <p className="text-gray-700 text-sm mt-1">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* References */}
        {cvData.references.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
              References
            </h2>
            {cvData.references.map((reference) => (
              <div key={reference.id} className="mb-4">
                <h4 className="font-semibold text-gray-800">{reference.name}</h4>
                <p className="text-sm text-gray-600">{reference.position}, {reference.company}</p>
                <p className="text-sm text-gray-600">{reference.email} | {reference.phone}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};