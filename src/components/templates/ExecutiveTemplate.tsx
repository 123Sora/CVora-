import React from 'react';
import type { CVData } from '../../types/cv';
import { getSkillIcon } from '../../utils/skillIcons';

interface ExecutiveTemplateProps {
  cvData: CVData;
}

export const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ cvData }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8">
        <div className="flex items-center gap-8">
          {cvData.personalInfo.profilePhoto && (
            <img
              src={cvData.personalInfo.profilePhoto}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-gold-400"
            />
          )}
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-3 text-gold-300">{cvData.personalInfo.fullName || 'Your Name'}</h1>
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
        {/* Executive Summary */}
        {cvData.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-4 border-yellow-500 pb-2">
              Executive Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">{cvData.personalInfo.summary}</p>
          </div>
        )}

        {/* Professional Experience */}
        {cvData.workExperience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-yellow-500 pb-2">
              Professional Experience
            </h2>
            {cvData.workExperience.map((exp) => (
              <div key={exp.id} className="mb-8 bg-gray-50 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{exp.jobTitle}</h3>
                    <p className="text-xl text-yellow-600 font-semibold">{exp.company}</p>
                    <p className="text-gray-600">{exp.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-700">
                      {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                    </p>
                  </div>
                </div>
                {exp.bulletPoints.length > 0 && exp.bulletPoints[0] && (
                  <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-4 space-y-2">
                    {exp.bulletPoints.filter(point => point.trim()).map((point, idx) => (
                      <li key={idx} className="text-lg">{point}</li>
                    ))}
                  </ul>
                )}
                {exp.description && (
                  <p className="text-gray-700 leading-relaxed mt-4 text-lg">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-yellow-500 pb-2">
              Education
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cvData.education.map((edu) => (
                <div key={edu.id} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800">{edu.degree}</h3>
                  <p className="text-lg text-yellow-600 font-semibold">{edu.institution}</p>
                  <p className="text-gray-600">{edu.location}</p>
                  <p className="text-gray-600">{formatDate(edu.graduationDate)}</p>
                  {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                  {edu.description && (
                    <p className="text-gray-700 leading-relaxed mt-2">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Core Competencies */}
        {cvData.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-yellow-500 pb-2">
              Core Competencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Technical', 'Soft Skills', 'Tools'].map(category => {
                const categorySkills = cvData.skills.filter(skill => skill.category === category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category} className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold text-gray-800 mb-4">{category}</h4>
                    <div className="space-y-3">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="flex items-center gap-3">
                          <span className="text-xl">{getSkillIcon(skill.name)}</span>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium text-gray-800">{skill.name}</span>
                              <span className="text-sm text-gray-600">{skill.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-300 rounded-full h-2">
                              <div 
                                className="bg-yellow-500 h-2 rounded-full" 
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

        {/* Additional sections in grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Languages */}
          {cvData.languages.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-yellow-500 pb-2">
                Languages
              </h2>
              <div className="space-y-2">
                {cvData.languages.map((language) => (
                  <div key={language.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <span className="font-medium text-gray-800">{language.name}</span>
                    <span className="text-sm text-gray-600 font-semibold">{language.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {cvData.projects.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-yellow-500 pb-2">
                Key Projects
              </h2>
              {cvData.projects.map((project) => (
                <div key={project.id} className="mb-4 bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800">{project.name}</h4>
                  {project.technologies && (
                    <p className="text-sm text-yellow-600 font-medium">{project.technologies}</p>
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
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-yellow-500 pb-2">
              Professional References
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cvData.references.map((reference) => (
                <div key={reference.id} className="bg-gray-50 p-6 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="text-xl font-bold text-gray-800">{reference.name}</h4>
                  <p className="text-lg text-yellow-600 font-semibold">{reference.position}</p>
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