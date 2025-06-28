import React from 'react';
import type{ CVData } from '../../types/cv';
import { getSkillIcon } from '../../utils/skillIcons';

interface ModernTemplateProps {
  cvData: CVData;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ cvData }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getSocialIcon = (platform: string) => {
    const platformLower = platform.toLowerCase();
    switch (platformLower) {
      case 'github':
        return '🔗';
      case 'twitter':
        return '🐦';
      case 'instagram':
        return '📷';
      case 'facebook':
        return '📘';
      case 'linkedin':
        return '💼';
      default:
        return '🌐';
    }
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
        <div className="flex items-center gap-6">
          {cvData.personalInfo.profilePhoto && (
            <img
              src={cvData.personalInfo.profilePhoto}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-white/20"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{cvData.personalInfo.fullName || 'Your Name'}</h1>
            <div className="flex flex-wrap gap-6 text-sm">
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
        {/* Professional Summary */}
        {cvData.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{cvData.personalInfo.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {cvData.workExperience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
              Work Experience
            </h2>
            {cvData.workExperience.map((exp, index) => (
              <div key={exp.id} className={`mb-6 ${index !== cvData.workExperience.length - 1 ? 'border-b border-gray-200 pb-6' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{exp.jobTitle}</h3>
                    <p className="text-lg text-blue-600 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{exp.location}</p>
                    <p>
                      {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                    </p>
                  </div>
                </div>
                {exp.bulletPoints.length > 0 && exp.bulletPoints[0] && (
                  <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-3 space-y-1">
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
              Education
            </h2>
            {cvData.education.map((edu, index) => (
              <div key={edu.id} className={`mb-6 ${index !== cvData.education.length - 1 ? 'border-b border-gray-200 pb-6' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-lg text-blue-600 font-medium">{edu.institution}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{edu.location}</p>
                    <p>{formatDate(edu.graduationDate)}</p>
                  </div>
                </div>
                {edu.description && (
                  <p className="text-gray-700 leading-relaxed mt-3">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Volunteering */}
        {cvData.volunteering.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
              Volunteering
            </h2>
            {cvData.volunteering.map((vol, index) => (
              <div key={vol.id} className={`mb-6 ${index !== cvData.volunteering.length - 1 ? 'border-b border-gray-200 pb-6' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{vol.role}</h3>
                    <p className="text-lg text-blue-600 font-medium">{vol.organization}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{vol.location}</p>
                    <p>
                      {formatDate(vol.startDate)} - {vol.isCurrentRole ? 'Present' : formatDate(vol.endDate)}
                    </p>
                  </div>
                </div>
                {vol.bulletPoints.length > 0 && vol.bulletPoints[0] && (
                  <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-3 space-y-1">
                    {vol.bulletPoints.filter(point => point.trim()).map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                )}
                {vol.description && (
                  <p className="text-gray-700 leading-relaxed mt-3">{vol.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Skills */}
          {cvData.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                Skills
              </h2>
              <div className="space-y-4">
                {['Technical', 'Soft Skills', 'Tools'].map(category => {
                  const categorySkills = cvData.skills.filter(skill => skill.category === category);
                  if (categorySkills.length === 0) return null;
                  
                  return (
                    <div key={category}>
                      <h4 className="font-semibold text-gray-800 mb-2">{category}</h4>
                      <div className="space-y-2">
                        {categorySkills.map((skill) => (
                          <div key={skill.id} className="flex items-center gap-3">
                            <span className="text-lg">{getSkillIcon(skill.name)}</span>
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-gray-800">{skill.name}</span>
                                <span className="text-xs text-gray-600">{skill.percentage}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
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

          {/* Languages */}
          {cvData.languages.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                Languages
              </h2>
              <div className="space-y-2">
                {cvData.languages.map((language) => (
                  <div key={language.id} className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{language.name}</span>
                    <span className="text-sm text-gray-600">{language.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects */}
        {cvData.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
              Projects
            </h2>
            {cvData.projects.map((project, index) => (
              <div key={project.id} className={`mb-6 ${index !== cvData.projects.length - 1 ? 'border-b border-gray-200 pb-6' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm underline"
                    >
                      View Project
                    </a>
                  )}
                </div>
                {project.technologies && (
                  <p className="text-sm text-blue-600 font-medium mb-2">{project.technologies}</p>
                )}
                {project.description && (
                  <p className="text-gray-700 leading-relaxed">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Social Media */}
          {cvData.socialMedia.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                Social Media
              </h2>
              <div className="space-y-2">
                {cvData.socialMedia.map((social) => (
                  <div key={social.id} className="flex items-center gap-3">
                    <span>{getSocialIcon(social.platform)}</span>
                    <div>
                      <span className="font-medium text-gray-800">{social.platform}</span>
                      <span className="text-gray-600 ml-2">@{social.username}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies */}
          {cvData.hobbies.length > 0 && cvData.hobbies[0] && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                Hobbies & Interests
              </h2>
              <div className="flex flex-wrap gap-2">
                {cvData.hobbies.filter(hobby => hobby.trim()).map((hobby, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* References */}
        {cvData.references.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
              References
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cvData.references.map((reference) => (
                <div key={reference.id} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800">{reference.name}</h4>
                  <p className="text-sm text-gray-600">{reference.position}</p>
                  <p className="text-sm text-gray-600">{reference.company}</p>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>{reference.email}</p>
                    <p>{reference.phone}</p>
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