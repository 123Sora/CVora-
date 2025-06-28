import React from 'react';
import type { CVData } from '../../types/cv';
import { getSkillIcon } from '../../utils/skillIcons';

interface DesignerTemplateProps {
  cvData: CVData;
}

export const DesignerTemplate: React.FC<DesignerTemplateProps> = ({ cvData }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 text-white p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex items-center gap-8">
          {cvData.personalInfo.profilePhoto && (
            <img
              src={cvData.personalInfo.profilePhoto}
              alt="Profile"
              className="w-36 h-36 rounded-2xl object-cover border-4 border-white/30 shadow-xl"
            />
          )}
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
              {cvData.personalInfo.fullName || 'Your Name'}
            </h1>
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
              {cvData.personalInfo.website && (
                <div className="flex items-center gap-2">
                  <span>🌐</span>
                  <span>{cvData.personalInfo.website}</span>
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
        {/* Creative Brief */}
        {cvData.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
              Creative Brief
            </h2>
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-2xl border-l-4 border-pink-500">
              <p className="text-gray-700 leading-relaxed text-lg">{cvData.personalInfo.summary}</p>
            </div>
          </div>
        )}

        {/* Design Skills */}
        {cvData.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
              Design Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Technical', 'Tools', 'Soft Skills'].map(category => {
                const categorySkills = cvData.skills.filter(skill => skill.category === category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category} className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl">
                    <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">{category}</h4>
                    <div className="space-y-4">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="text-2xl">{getSkillIcon(skill.name)}</span>
                            <span className="font-medium text-gray-800">{skill.name}</span>
                          </div>
                          <div className="relative">
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full transition-all duration-500" 
                                style={{ width: `${skill.percentage}%` }}
                              ></div>
                            </div>
                            <span className="absolute -top-6 right-0 text-xs font-bold text-purple-600">{skill.percentage}%</span>
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

        {/* Portfolio Projects */}
        {cvData.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
              Portfolio Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cvData.projects.map((project, index) => (
                <div key={project.id} className={`p-6 rounded-2xl ${
                  index % 2 === 0 
                    ? 'bg-gradient-to-br from-pink-50 to-pink-100 border-l-4 border-pink-500' 
                    : 'bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-500'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{project.name}</h3>
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm hover:shadow-lg transition-all"
                      >
                        View
                      </a>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-sm font-medium text-purple-600 mb-3">{project.technologies}</p>
                  )}
                  {project.description && (
                    <p className="text-gray-700 leading-relaxed">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {cvData.workExperience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
              Experience
            </h2>
            {cvData.workExperience.map((exp) => (
              <div key={exp.id} className="mb-6 relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-pink-500 to-purple-600 rounded-full"></div>
                <div className="ml-8 bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-2xl">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{exp.jobTitle}</h3>
                      <p className="text-lg font-medium bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">{exp.company}</p>
                      <p className="text-gray-600">{exp.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-700">
                        {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                      </p>
                    </div>
                  </div>
                  {exp.bulletPoints.length > 0 && exp.bulletPoints[0] && (
                    <ul className="space-y-2 mt-4">
                      {exp.bulletPoints.filter(point => point.trim()).map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <span className="text-pink-500 mt-1">●</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed mt-4">{exp.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
              Education
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cvData.education.map((edu) => (
                <div key={edu.id} className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl border-l-4 border-pink-500">
                  <h3 className="text-xl font-bold text-gray-800">{edu.degree}</h3>
                  <p className="text-lg font-medium text-purple-600">{edu.institution}</p>
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

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Languages */}
          {cvData.languages.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
                Languages
              </h2>
              <div className="space-y-3">
                {cvData.languages.map((language) => (
                  <div key={language.id} className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">{language.name}</span>
                      <span className="text-sm font-medium text-purple-600">{language.proficiency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {cvData.hobbies.length > 0 && cvData.hobbies[0] && (
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
                Interests
              </h2>
              <div className="flex flex-wrap gap-2">
                {cvData.hobbies.filter(hobby => hobby.trim()).map((hobby, index) => (
                  <span key={index} className="bg-gradient-to-r from-pink-100 to-purple-100 text-gray-800 px-4 py-2 rounded-full text-sm border border-pink-200">
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};