import React from 'react';
import type { CVData } from '../../types/cv';
import { getSkillIcon } from '../../utils/skillIcons';

interface TechTemplateProps {
  cvData: CVData;
}

export const TechTemplate: React.FC<TechTemplateProps> = ({ cvData }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8">
        <div className="flex items-center gap-6">
          {cvData.personalInfo.profilePhoto && (
            <img
              src={cvData.personalInfo.profilePhoto}
              alt="Profile"
              className="w-36 h-36 rounded-lg object-cover border-2 border-green-400"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-mono font-bold mb-2">{cvData.personalInfo.fullName || 'Your Name'}</h1>
            <div className="flex flex-wrap gap-4 text-sm font-mono">
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
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* About */}
        {cvData.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-mono font-bold text-green-400 mb-4 flex items-center gap-2">
              <span className="text-blue-400">{'>'}</span> About
            </h2>
            <p className="text-gray-300 leading-relaxed font-mono">{cvData.personalInfo.summary}</p>
          </div>
        )}

        {/* Tech Stack */}
        {cvData.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-mono font-bold text-green-400 mb-4 flex items-center gap-2">
              <span className="text-blue-400">{'>'}</span> Tech Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Technical', 'Tools', 'Soft Skills'].map(category => {
                const categorySkills = cvData.skills.filter(skill => skill.category === category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <h4 className="text-lg font-mono font-bold text-blue-400 mb-3">{category}</h4>
                    <div className="space-y-3">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="flex items-center gap-3">
                          <span className="text-lg">{getSkillIcon(skill.name)}</span>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-mono text-sm text-gray-300">{skill.name}</span>
                              <span className="font-mono text-xs text-green-400">{skill.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-1">
                              <div 
                                className="bg-gradient-to-r from-green-400 to-blue-400 h-1 rounded-full" 
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

        {/* Experience */}
        {cvData.workExperience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-mono font-bold text-green-400 mb-4 flex items-center gap-2">
              <span className="text-blue-400">{'>'}</span> Experience
            </h2>
            {cvData.workExperience.map((exp) => (
              <div key={exp.id} className="mb-6 bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-mono font-bold text-white">{exp.jobTitle}</h3>
                    <p className="text-lg text-blue-400 font-mono">{exp.company}</p>
                    <p className="text-gray-400 font-mono text-sm">{exp.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm text-green-400">
                      {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                    </p>
                  </div>
                </div>
                {exp.bulletPoints.length > 0 && exp.bulletPoints[0] && (
                  <ul className="space-y-2 mt-4">
                    {exp.bulletPoints.filter(point => point.trim()).map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300 font-mono text-sm">
                        <span className="text-green-400 mt-1">▸</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {exp.description && (
                  <p className="text-gray-300 leading-relaxed mt-4 font-mono text-sm">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {cvData.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-mono font-bold text-green-400 mb-4 flex items-center gap-2">
              <span className="text-blue-400">{'>'}</span> Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cvData.projects.map((project) => (
                <div key={project.id} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-mono font-bold text-white">{project.name}</h3>
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 font-mono text-sm"
                      >
                        🔗 View
                      </a>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-green-400 font-mono text-sm mb-2">{project.technologies}</p>
                  )}
                  {project.description && (
                    <p className="text-gray-300 font-mono text-sm leading-relaxed">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-mono font-bold text-green-400 mb-4 flex items-center gap-2">
              <span className="text-blue-400">{'>'}</span> Education
            </h2>
            {cvData.education.map((edu) => (
              <div key={edu.id} className="mb-4 bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-mono font-bold text-white">{edu.degree}</h3>
                    <p className="text-blue-400 font-mono">{edu.institution}</p>
                    <p className="text-gray-400 font-mono text-sm">{edu.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm text-green-400">{formatDate(edu.graduationDate)}</p>
                    {edu.gpa && <p className="font-mono text-sm text-gray-400">GPA: {edu.gpa}</p>}
                  </div>
                </div>
                {edu.description && (
                  <p className="text-gray-300 font-mono text-sm mt-2">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Languages & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Languages */}
          {cvData.languages.length > 0 && (
            <div>
              <h2 className="text-xl font-mono font-bold text-green-400 mb-4 flex items-center gap-2">
                <span className="text-blue-400">{'>'}</span> Languages
              </h2>
              <div className="space-y-2">
                {cvData.languages.map((language) => (
                  <div key={language.id} className="flex justify-between items-center bg-gray-800 p-3 rounded border border-gray-700">
                    <span className="font-mono text-white">{language.name}</span>
                    <span className="font-mono text-sm text-green-400">{language.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social */}
          {cvData.socialMedia.length > 0 && (
            <div>
              <h2 className="text-xl font-mono font-bold text-green-400 mb-4 flex items-center gap-2">
                <span className="text-blue-400">{'>'}</span> Social
              </h2>
              <div className="space-y-2">
                {cvData.socialMedia.map((social) => (
                  <div key={social.id} className="flex items-center gap-3 bg-gray-800 p-3 rounded border border-gray-700">
                    <span className="text-blue-400 font-mono">{social.platform}</span>
                    <span className="text-gray-300 font-mono text-sm">@{social.username}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};