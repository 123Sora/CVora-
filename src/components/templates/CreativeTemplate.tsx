import React from 'react';
import type { CVData } from '../../types/cv';
import { Mail, Phone, MapPin, Globe, Linkedin, Star } from 'lucide-react';

interface CreativeTemplateProps {
  cvData: CVData;
}

export const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ cvData }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getSkillLevel = (level: string) => {
    const levels = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3, 'Expert': 4 };
    return levels[level as keyof typeof levels] || 2;
  };

  return (
    <div className="bg-white">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gradient-to-b from-purple-600 to-pink-600 text-white p-6">
          {/* Profile Photo */}
          {cvData.personalInfo.profilePhoto && (
            <div className="text-center mb-6">
              <img
                src={cvData.personalInfo.profilePhoto}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white/30"
              />
            </div>
          )}

          {/* Contact Info */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">CONTACT</h3>
            <div className="space-y-3 text-sm">
              {cvData.personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="break-all">{cvData.personalInfo.email}</span>
                </div>
              )}
              {cvData.personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{cvData.personalInfo.phone}</span>
                </div>
              )}
              {cvData.personalInfo.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{cvData.personalInfo.address}</span>
                </div>
              )}
              {cvData.personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="break-all">{cvData.personalInfo.website}</span>
                </div>
              )}
              {cvData.personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  <span className="break-all">{cvData.personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {cvData.skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">SKILLS</h3>
              <div className="space-y-3">
                {cvData.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((level) => (
                        <Star
                          key={level}
                          className={`w-3 h-3 ${
                            level <= getSkillLevel(skill.level)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {cvData.languages.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">LANGUAGES</h3>
              <div className="space-y-2">
                {cvData.languages.map((language) => (
                  <div key={language.id} className="text-sm">
                    <div className="font-medium">{language.name}</div>
                    <div className="text-white/80">{language.proficiency}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies */}
          {cvData.hobbies.length > 0 && cvData.hobbies[0] && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">INTERESTS</h3>
              <div className="flex flex-wrap gap-2">
                {cvData.hobbies.filter(hobby => hobby.trim()).map((hobby, index) => (
                  <span key={index} className="bg-white/20 px-2 py-1 rounded-full text-xs">
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {cvData.personalInfo.fullName || 'Your Name'}
            </h1>
            {cvData.personalInfo.summary && (
              <p className="text-gray-600 leading-relaxed">{cvData.personalInfo.summary}</p>
            )}
          </div>

          {/* Work Experience */}
          {cvData.workExperience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center gap-2">
                <div className="w-8 h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                EXPERIENCE
              </h2>
              {cvData.workExperience.map((exp) => (
                <div key={exp.id} className="mb-6 relative">
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-600 to-pink-600"></div>
                  <div className="ml-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{exp.jobTitle}</h3>
                        <p className="text-purple-600 font-medium">{exp.company}</p>
                        <p className="text-sm text-gray-500">{exp.location}</p>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <p>{formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}</p>
                      </div>
                    </div>
                    {exp.bulletPoints.length > 0 && exp.bulletPoints[0] && (
                      <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-2 space-y-1">
                        {exp.bulletPoints.filter(point => point.trim()).map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    )}
                    {exp.description && (
                      <p className="text-gray-700 leading-relaxed mt-2">{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {cvData.education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center gap-2">
                <div className="w-8 h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                EDUCATION
              </h2>
              {cvData.education.map((edu) => (
                <div key={edu.id} className="mb-4 relative">
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-600 to-pink-600"></div>
                  <div className="ml-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
                        <p className="text-purple-600 font-medium">{edu.institution}</p>
                        <p className="text-sm text-gray-500">{edu.location}</p>
                        {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <p>{formatDate(edu.graduationDate)}</p>
                      </div>
                    </div>
                    {edu.description && (
                      <p className="text-gray-700 leading-relaxed mt-2">{edu.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {cvData.projects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center gap-2">
                <div className="w-8 h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                PROJECTS
              </h2>
              {cvData.projects.map((project) => (
                <div key={project.id} className="mb-4 relative">
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-600 to-pink-600"></div>
                  <div className="ml-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-800 text-sm underline"
                        >
                          View Project
                        </a>
                      )}
                    </div>
                    {project.technologies && (
                      <p className="text-sm text-purple-600 font-medium mb-2">{project.technologies}</p>
                    )}
                    {project.description && (
                      <p className="text-gray-700 leading-relaxed">{project.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* References */}
          {cvData.references.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center gap-2">
                <div className="w-8 h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                REFERENCES
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    </div>
  );
};