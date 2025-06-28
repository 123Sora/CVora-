import React from 'react';
import type { CVData } from '../../types/cv';
import { getSkillIcon } from '../../utils/skillIcons';

interface CorporateTemplateProps {
  cvData: CVData;
}

export const CorporateTemplate: React.FC<CorporateTemplateProps> = ({ cvData }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white p-8">
        <div className="flex items-center gap-6">
          {cvData.personalInfo.profilePhoto && (
            <img
              src={cvData.personalInfo.profilePhoto}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-gray-700"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{cvData.personalInfo.fullName || 'Your Name'}</h1>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {cvData.personalInfo.email && (
                <div className="flex items-center gap-2">
                  <span>📧</span>
                  <span>{cvData.personalInfo.email}</span>
                </div>
              )}
              {cvData.personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <span>📞</span>
                  <span>{cvData.personalInfo.phone}</span>
                </div>
              )}
              {cvData.personalInfo.address && (
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{cvData.personalInfo.address}</span>
                </div>
              )}
              {cvData.personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <span>💼</span>
                  <span>{cvData.personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Professional Summary */}
        {cvData.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">{cvData.personalInfo.summary}</p>
          </div>
        )}

        {/* Professional Experience */}
        {cvData.workExperience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2">
              PROFESSIONAL EXPERIENCE
            </h2>
            {cvData.workExperience.map((exp) => (
              <div key={exp.id} className="mb-8 border-l-4 border-gray-300 pl-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{exp.jobTitle}</h3>
                    <p className="text-lg font-semibold text-gray-700">{exp.company}</p>
                    <p className="text-gray-600">{exp.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-700">
                      {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                    </p>
                  </div>
                </div>
                {exp.bulletPoints.length > 0 && exp.bulletPoints[0] && (
                  <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-3 space-y-2">
                    {exp.bulletPoints.filter(point => point.trim()).map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                )}
                {exp.description && (
                  <p className="text-gray-700 leading-relaxed mt-3">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2">
              EDUCATION
            </h2>
            {cvData.education.map((edu) => (
              <div key={edu.id} className="mb-6 border-l-4 border-gray-300 pl-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-lg font-semibold text-gray-700">{edu.institution}</p>
                    <p className="text-gray-600">{edu.location}</p>
                    {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-700">{formatDate(edu.graduationDate)}</p>
                  </div>
                </div>
                {edu.description && (
                  <p className="text-gray-700 leading-relaxed mt-2">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Core Competencies */}
        {cvData.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2">
              CORE COMPETENCIES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Technical', 'Soft Skills', 'Tools'].map(category => {
                const categorySkills = cvData.skills.filter(skill => skill.category === category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category}>
                    <h4 className="text-lg font-bold text-gray-900 mb-4 text-center border-b border-gray-300 pb-2">{category}</h4>
                    <div className="space-y-3">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="flex items-center gap-3">
                          <span className="text-lg">{getSkillIcon(skill.name)}</span>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium text-gray-900">{skill.name}</span>
                              <span className="text-sm text-gray-600">{skill.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gray-900 h-2 rounded-full" 
                                style={{ width: `${skill.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Languages */}
          {cvData.languages.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-900 pb-2">
                LANGUAGES
              </h2>
              <div className="space-y-2">
                {cvData.languages.map((language) => (
                  <div key={language.id} className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="font-medium text-gray-900">{language.name}</span>
                    <span className="text-sm text-gray-600">{language.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {cvData.projects.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-900 pb-2">
                KEY PROJECTS
              </h2>
              {cvData.projects.map((project) => (
                <div key={project.id} className="mb-4 border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-900">{project.name}</h4>
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-gray-900 text-sm underline"
                      >
                        View
                      </a>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-sm text-gray-600 font-medium">{project.technologies}</p>
                  )}
                  {project.description && (
                    <p className="text-gray-700 text-sm mt-1">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* References */}
        {cvData.references.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2">
              PROFESSIONAL REFERENCES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cvData.references.map((reference) => (
                <div key={reference.id} className="border border-gray-300 p-6 rounded-lg">
                  <h4 className="text-lg font-bold text-gray-900">{reference.name}</h4>
                  <p className="font-semibold text-gray-700">{reference.position}</p>
                  <p className="text-gray-600">{reference.company}</p>
                  <div className="mt-3 text-gray-600">
                    <p>📧 {reference.email}</p>
                    <p>📞 {reference.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};