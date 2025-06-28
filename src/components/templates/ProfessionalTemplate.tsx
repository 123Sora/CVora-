import React from 'react';
import type { CVData } from '../../types/cv';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface ProfessionalTemplateProps {
  cvData: CVData;
}

export const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ cvData }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-white">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gray-800 text-white p-6">
          {/* Profile Photo */}
          {cvData.personalInfo.profilePhoto && (
            <div className="text-center mb-6">
              <img
                src={cvData.personalInfo.profilePhoto}
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover mx-auto border-4 border-gray-600"
              />
            </div>
          )}

          {/* Contact Info */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-gray-300 uppercase tracking-wide">Contact</h3>
            <div className="space-y-3 text-sm">
              {cvData.personalInfo.email && (
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span className="break-all">{cvData.personalInfo.email}</span>
                </div>
              )}
              {cvData.personalInfo.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{cvData.personalInfo.phone}</span>
                </div>
              )}
              {cvData.personalInfo.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>{cvData.personalInfo.address}</span>
                </div>
              )}
              {cvData.personalInfo.website && (
                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span className="break-all">{cvData.personalInfo.website}</span>
                </div>
              )}
              {cvData.personalInfo.linkedin && (
                <div className="flex items-start gap-3">
                  <Linkedin className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span className="break-all">{cvData.personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {cvData.skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 text-gray-300 uppercase tracking-wide">Skills</h3>
              <div className="space-y-4">
                {['Technical', 'Soft Skills', 'Tools', 'Languages'].map(category => {
                  const categorySkills = cvData.skills.filter(skill => skill.category === category);
                  if (categorySkills.length === 0) return null;
                  
                  return (
                    <div key={category}>
                      <h4 className="font-semibold text-gray-300 mb-2 text-sm">{category}</h4>
                      <div className="space-y-1">
                        {categorySkills.map((skill) => (
                          <div key={skill.id} className="text-sm">
                            <div className="flex justify-between items-center mb-1">
                              <span>{skill.name}</span>
                              <span className="text-xs text-gray-400">{skill.level}</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-1">
                              <div 
                                className="bg-blue-500 h-1 rounded-full" 
                                style={{ 
                                  width: skill.level === 'Expert' ? '100%' : 
                                         skill.level === 'Advanced' ? '75%' : 
                                         skill.level === 'Intermediate' ? '50%' : '25%' 
                                }}
                              ></div>
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
              <h3 className="text-lg font-bold mb-4 text-gray-300 uppercase tracking-wide">Languages</h3>
              <div className="space-y-2">
                {cvData.languages.map((language) => (
                  <div key={language.id} className="text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{language.name}</span>
                      <span className="text-xs text-gray-400">{language.proficiency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Media */}
          {cvData.socialMedia.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 text-gray-300 uppercase tracking-wide">Social</h3>
              <div className="space-y-2">
                {cvData.socialMedia.map((social) => (
                  <div key={social.id} className="text-sm">
                    <div className="font-medium text-gray-300">{social.platform}</div>
                    <div className="text-gray-400">@{social.username}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies */}
          {cvData.hobbies.length > 0 && cvData.hobbies[0] && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 text-gray-300 uppercase tracking-wide">Interests</h3>
              <div className="text-sm space-y-1">
                {cvData.hobbies.filter(hobby => hobby.trim()).map((hobby, index) => (
                  <div key={index} className="text-gray-300">{hobby}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {cvData.personalInfo.fullName || 'Your Name'}
            </h1>
            {cvData.personalInfo.summary && (
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-3">Professional Summary</h2>
                <p className="text-gray-600 leading-relaxed">{cvData.personalInfo.summary}</p>
              </div>
            )}
          </div>

          {/* Work Experience */}
          {cvData.workExperience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-gray-800 pb-2">
                Professional Experience
              </h2>
              {cvData.workExperience.map((exp) => (
                <div key={exp.id} className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{exp.jobTitle}</h3>
                      <p className="text-lg text-gray-600 font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.location}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p className="font-medium">
                        {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                      </p>
                    </div>
                  </div>
                  {exp.bulletPoints.length > 0 && exp.bulletPoints[0] && (
                    <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-3 space-y-1 ml-4">
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-gray-800 pb-2">
                Education
              </h2>
              {cvData.education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                      <p className="text-lg text-gray-600 font-medium">{edu.institution}</p>
                      <p className="text-sm text-gray-500">{edu.location}</p>
                      {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p className="font-medium">{formatDate(edu.graduationDate)}</p>
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 leading-relaxed mt-2">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {cvData.projects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-gray-800 pb-2">
                Key Projects
              </h2>
              {cvData.projects.map((project) => (
                <div key={project.id} className="mb-6">
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
                    <p className="text-sm text-gray-600 font-medium mb-2">Technologies: {project.technologies}</p>
                  )}
                  {project.description && (
                    <p className="text-gray-700 leading-relaxed">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* References */}
          {cvData.references.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-gray-800 pb-2">
                References
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cvData.references.map((reference) => (
                  <div key={reference.id} className="border border-gray-200 p-4 rounded-lg">
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