import React from 'react';
import type { CVData } from '../../types/cv';
import { getSkillIcon } from '../../utils/skillIcons';

interface AcademicTemplateProps {
  cvData: CVData;
}

export const AcademicTemplate: React.FC<AcademicTemplateProps> = ({ cvData }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-white font-serif">
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
              <span>📧</span>
              <span>{cvData.personalInfo.email}</span>
            </div>
          )}
          {cvData.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <span>📞</span>
              <span>{cvData.personalInfo.phone}</span>
            </div>
          )}
          {cvData.personalInfo.address && (
            <div className="flex items-center gap-1">
              <span>📍</span>
              <span>{cvData.personalInfo.address}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8">
        {/* Research Interests / Summary */}
        {cvData.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
              Research Interests
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">{cvData.personalInfo.summary}</p>
          </div>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
              Education
            </h2>
            {cvData.education.map((edu) => (
              <div key={edu.id} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-gray-600 italic">{edu.institution}, {edu.location}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{formatDate(edu.graduationDate)}</p>
                  </div>
                </div>
                {edu.description && (
                  <p className="text-gray-700 leading-relaxed mt-2 text-justify">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Academic Experience */}
        {cvData.workExperience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
              Academic Experience
            </h2>
            {cvData.workExperience.map((exp) => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{exp.jobTitle}</h3>
                    <p className="text-gray-600 italic">{exp.company}, {exp.location}</p>
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
                  <p className="text-gray-700 leading-relaxed mt-2 text-justify">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Research Projects */}
        {cvData.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
              Research Projects
            </h2>
            {cvData.projects.map((project) => (
              <div key={project.id} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
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
                  <p className="text-sm text-gray-600 italic mb-2">Methodology: {project.technologies}</p>
                )}
                {project.description && (
                  <p className="text-gray-700 leading-relaxed text-justify">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills & Competencies */}
        {cvData.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
              Skills & Competencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Technical', 'Soft Skills', 'Tools'].map(category => {
                const categorySkills = cvData.skills.filter(skill => skill.category === category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category}>
                    <h4 className="font-semibold text-gray-800 mb-3 text-center">{category}</h4>
                    <div className="space-y-2">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <span>{getSkillIcon(skill.name)}</span>
                            <span className="text-sm text-gray-800">{skill.name}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <div 
                              className="bg-gray-600 h-1 rounded-full" 
                              style={{ width: `${skill.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600">{skill.percentage}%</span>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
              Languages
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {cvData.languages.map((language) => (
                <div key={language.id} className="text-center">
                  <div className="font-semibold text-gray-800">{language.name}</div>
                  <div className="text-sm text-gray-600">{language.proficiency}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Volunteering */}
        {cvData.volunteering.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
              Service & Volunteering
            </h2>
            {cvData.volunteering.map((vol) => (
              <div key={vol.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{vol.role}</h3>
                    <p className="text-gray-600 italic">{vol.organization}, {vol.location}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{formatDate(vol.startDate)} - {vol.isCurrentRole ? 'Present' : formatDate(vol.endDate)}</p>
                  </div>
                </div>
                {vol.description && (
                  <p className="text-gray-700 leading-relaxed mt-2 text-justify">{vol.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* References */}
        {cvData.references.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
              References
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cvData.references.map((reference) => (
                <div key={reference.id} className="text-center">
                  <h4 className="font-semibold text-gray-800">{reference.name}</h4>
                  <p className="text-sm text-gray-600 italic">{reference.position}</p>
                  <p className="text-sm text-gray-600">{reference.company}</p>
                  <div className="mt-2 text-sm text-gray-600">
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