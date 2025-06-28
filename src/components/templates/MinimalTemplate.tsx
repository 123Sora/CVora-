import React from 'react';
import type { CVData } from '../../types/cv';

interface MinimalTemplateProps {
  cvData: CVData;
}

export const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ cvData }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white p-12 font-light">
      {/* Header */}
      <div className="text-center mb-12">
        {cvData.personalInfo.profilePhoto && (
          <img
            src={cvData.personalInfo.profilePhoto}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover mx-auto mb-6 grayscale"
          />
        )}
        <h1 className="text-5xl font-thin text-gray-800 mb-4 tracking-wide">
          {cvData.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex justify-center flex-wrap gap-6 text-sm text-gray-600 mb-6">
          {cvData.personalInfo.email && <span>{cvData.personalInfo.email}</span>}
          {cvData.personalInfo.phone && <span>{cvData.personalInfo.phone}</span>}
          {cvData.personalInfo.address && <span>{cvData.personalInfo.address}</span>}
        </div>
        {cvData.personalInfo.summary && (
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {cvData.personalInfo.summary}
          </p>
        )}
      </div>

      {/* Work Experience */}
      {cvData.workExperience.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-thin text-gray-800 mb-8 text-center tracking-widest uppercase">
            Experience
          </h2>
          <div className="space-y-8">
            {cvData.workExperience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-gray-200 pl-8 relative">
                <div className="absolute w-3 h-3 bg-gray-400 rounded-full -left-2 top-0"></div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-normal text-gray-800">{exp.jobTitle}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p>{exp.location}</p>
                    <p>{formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}</p>
                  </div>
                </div>
                {exp.bulletPoints.length > 0 && exp.bulletPoints[0] && (
                  <ul className="space-y-2 text-gray-700 leading-relaxed">
                    {exp.bulletPoints.filter(point => point.trim()).map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-3 flex-shrink-0"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {exp.description && (
                  <p className="text-gray-700 leading-relaxed mt-3">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {cvData.education.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-thin text-gray-800 mb-8 text-center tracking-widest uppercase">
            Education
          </h2>
          <div className="space-y-6">
            {cvData.education.map((edu) => (
              <div key={edu.id} className="text-center">
                <h3 className="text-xl font-normal text-gray-800">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-sm text-gray-500">{formatDate(edu.graduationDate)}</p>
                {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                {edu.description && (
                  <p className="text-gray-700 leading-relaxed mt-2 max-w-2xl mx-auto">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {cvData.skills.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-thin text-gray-800 mb-8 text-center tracking-widest uppercase">
            Skills
          </h2>
          <div className="text-center">
            <p className="text-gray-700 leading-relaxed">
              {cvData.skills.map(skill => skill.name).join(' • ')}
            </p>
          </div>
        </div>
      )}

      {/* Languages */}
      {cvData.languages.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-thin text-gray-800 mb-8 text-center tracking-widest uppercase">
            Languages
          </h2>
          <div className="text-center space-y-2">
            {cvData.languages.map((language) => (
              <p key={language.id} className="text-gray-700">
                {language.name} <span className="text-gray-500">({language.proficiency})</span>
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {cvData.projects.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-thin text-gray-800 mb-8 text-center tracking-widest uppercase">
            Projects
          </h2>
          <div className="space-y-6">
            {cvData.projects.map((project) => (
              <div key={project.id} className="text-center">
                <h3 className="text-xl font-normal text-gray-800">{project.name}</h3>
                {project.technologies && (
                  <p className="text-sm text-gray-600 mb-2">{project.technologies}</p>
                )}
                {project.description && (
                  <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">{project.description}</p>
                )}
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 text-sm underline mt-2 inline-block"
                  >
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hobbies */}
      {cvData.hobbies.length > 0 && cvData.hobbies[0] && (
        <div className="mb-12">
          <h2 className="text-2xl font-thin text-gray-800 mb-8 text-center tracking-widest uppercase">
            Interests
          </h2>
          <div className="text-center">
            <p className="text-gray-700 leading-relaxed">
              {cvData.hobbies.filter(hobby => hobby.trim()).join(' • ')}
            </p>
          </div>
        </div>
      )}

      {/* References */}
      {cvData.references.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-thin text-gray-800 mb-8 text-center tracking-widest uppercase">
            References
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cvData.references.map((reference) => (
              <div key={reference.id} className="text-center">
                <h4 className="font-normal text-gray-800">{reference.name}</h4>
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
  );
};