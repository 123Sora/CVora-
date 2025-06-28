import React from 'react';
import { Plus, Trash2, User, Briefcase, GraduationCap, Code, FolderOpen, Camera, Users, Globe, Heart, Languages, HandHeart } from 'lucide-react';
import type { CVData, WorkExperience, Education, Volunteering, Skill, Project, Language, Reference, SocialMedia } from '../types/cv';
import { getSkillIcon } from '../utils/skillIcons';

interface CVFormProps {
  cvData: CVData;
  setCvData: React.Dispatch<React.SetStateAction<CVData>>;
}

export const CVForm: React.FC<CVFormProps> = ({ cvData, setCvData }) => {
  const updatePersonalInfo = (field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updatePersonalInfo('profilePhoto', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
      description: '',
      bulletPoints: ['']
    };
    setCvData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, newExperience]
    }));
  };

  const updateWorkExperience = (id: string, field: string, value: string | boolean | string[]) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addBulletPoint = (expId: string) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp =>
        exp.id === expId ? { ...exp, bulletPoints: [...exp.bulletPoints, ''] } : exp
      )
    }));
  };

  const updateBulletPoint = (expId: string, index: number, value: string) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp =>
        exp.id === expId ? {
          ...exp,
          bulletPoints: exp.bulletPoints.map((point, i) => i === index ? value : point)
        } : exp
      )
    }));
  };

  const removeBulletPoint = (expId: string, index: number) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp =>
        exp.id === expId ? {
          ...exp,
          bulletPoints: exp.bulletPoints.filter((_, i) => i !== index)
        } : exp
      )
    }));
  };

  const removeWorkExperience = (id: string) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
      gpa: '',
      description: ''
    };
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addVolunteering = () => {
    const newVolunteering: Volunteering = {
      id: Date.now().toString(),
      role: '',
      organization: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentRole: false,
      description: '',
      bulletPoints: ['']
    };
    setCvData(prev => ({
      ...prev,
      volunteering: [...prev.volunteering, newVolunteering]
    }));
  };

  const updateVolunteering = (id: string, field: string, value: string | boolean | string[]) => {
    setCvData(prev => ({
      ...prev,
      volunteering: prev.volunteering.map(vol =>
        vol.id === id ? { ...vol, [field]: value } : vol
      )
    }));
  };

  const addVolunteeringBulletPoint = (volId: string) => {
    setCvData(prev => ({
      ...prev,
      volunteering: prev.volunteering.map(vol =>
        vol.id === volId ? { ...vol, bulletPoints: [...vol.bulletPoints, ''] } : vol
      )
    }));
  };

  const updateVolunteeringBulletPoint = (volId: string, index: number, value: string) => {
    setCvData(prev => ({
      ...prev,
      volunteering: prev.volunteering.map(vol =>
        vol.id === volId ? {
          ...vol,
          bulletPoints: vol.bulletPoints.map((point, i) => i === index ? value : point)
        } : vol
      )
    }));
  };

  const removeVolunteeringBulletPoint = (volId: string, index: number) => {
    setCvData(prev => ({
      ...prev,
      volunteering: prev.volunteering.map(vol =>
        vol.id === volId ? {
          ...vol,
          bulletPoints: vol.bulletPoints.filter((_, i) => i !== index)
        } : vol
      )
    }));
  };

  const removeVolunteering = (id: string) => {
    setCvData(prev => ({
      ...prev,
      volunteering: prev.volunteering.filter(vol => vol.id !== id)
    }));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      percentage: 50,
      level: '',
      category: 'Technical'
    };
    setCvData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (id: string, field: string, value: string | number) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const removeSkill = (id: string) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      name: '',
      proficiency: 'Conversational'
    };
    setCvData(prev => ({
      ...prev,
      languages: [...prev.languages, newLanguage]
    }));
  };

  const updateLanguage = (id: string, field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.map(lang =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    }));
  };

  const removeLanguage = (id: string) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang.id !== id)
    }));
  };

  const addReference = () => {
    const newReference: Reference = {
      id: Date.now().toString(),
      name: '',
      position: '',
      company: '',
      email: '',
      phone: ''
    };
    setCvData(prev => ({
      ...prev,
      references: [...prev.references, newReference]
    }));
  };

  const updateReference = (id: string, field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      references: prev.references.map(ref =>
        ref.id === id ? { ...ref, [field]: value } : ref
      )
    }));
  };

  const removeReference = (id: string) => {
    setCvData(prev => ({
      ...prev,
      references: prev.references.filter(ref => ref.id !== id)
    }));
  };

  const addSocialMedia = () => {
    const newSocialMedia: SocialMedia = {
      id: Date.now().toString(),
      platform: '',
      url: '',
      username: ''
    };
    setCvData(prev => ({
      ...prev,
      socialMedia: [...prev.socialMedia, newSocialMedia]
    }));
  };

  const updateSocialMedia = (id: string, field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      socialMedia: prev.socialMedia.map(social =>
        social.id === id ? { ...social, [field]: value } : social
      )
    }));
  };

  const removeSocialMedia = (id: string) => {
    setCvData(prev => ({
      ...prev,
      socialMedia: prev.socialMedia.filter(social => social.id !== id)
    }));
  };

  const addHobby = () => {
    setCvData(prev => ({
      ...prev,
      hobbies: [...prev.hobbies, '']
    }));
  };

  const updateHobby = (index: number, value: string) => {
    setCvData(prev => ({
      ...prev,
      hobbies: prev.hobbies.map((hobby, i) => i === index ? value : hobby)
    }));
  };

  const removeHobby = (index: number) => {
    setCvData(prev => ({
      ...prev,
      hobbies: prev.hobbies.filter((_, i) => i !== index)
    }));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: '',
      link: ''
    };
    setCvData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (id: string, field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === id ? { ...project, [field]: value } : project
      )
    }));
  };

  const removeProject = (id: string) => {
    setCvData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }));
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <User className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Personal Information</h2>
        </div>
        
        {/* Profile Photo Upload */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
          <div className="flex items-center gap-4">
            {cvData.personalInfo.profilePhoto && (
              <img
                src={cvData.personalInfo.profilePhoto}
                alt="Profile"
                className="w-28 sm:w-36 h-28 sm:h-36 rounded-full object-cover border-4 border-blue-100"
              />
            )}
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 cursor-pointer text-sm"
              >
                <Camera className="w-4 h-4" />
                {cvData.personalInfo.profilePhoto ? 'Change Photo' : 'Upload Photo'}
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={cvData.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={cvData.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={cvData.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
          />
          <input
            type="text"
            placeholder="Address"
            value={cvData.personalInfo.address}
            onChange={(e) => updatePersonalInfo('address', e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
          />
          <input
            type="url"
            placeholder="LinkedIn Profile"
            value={cvData.personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
          />
          <input
            type="url"
            placeholder="Personal Website"
            value={cvData.personalInfo.website}
            onChange={(e) => updatePersonalInfo('website', e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
          />
        </div>
        <textarea
          placeholder="Professional Summary"
          value={cvData.personalInfo.summary}
          onChange={(e) => updatePersonalInfo('summary', e.target.value)}
          rows={4}
          className="w-full mt-3 sm:mt-4 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
        />
      </div>

      {/* Work Experience */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <Briefcase className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Work Experience</h2>
          </div>
          <button
            onClick={addWorkExperience}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Experience</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
        {cvData.workExperience.map((exp) => (
          <div key={exp.id} className="mb-4 sm:mb-6 p-3 sm:p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-medium text-gray-800">Experience #{cvData.workExperience.indexOf(exp) + 1}</h3>
              <button
                onClick={() => removeWorkExperience(exp.id)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Job Title"
                value={exp.jobTitle}
                onChange={(e) => updateWorkExperience(exp.id, 'jobTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
              <input
                type="text"
                placeholder="Location"
                value={exp.location}
                onChange={(e) => updateWorkExperience(exp.id, 'location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
              <div className="flex gap-2">
                <input
                  type="date"
                  placeholder="Start Date"
                  value={exp.startDate}
                  onChange={(e) => updateWorkExperience(exp.id, 'startDate', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                />
                <input
                  type="date"
                  placeholder="End Date"
                  value={exp.endDate}
                  onChange={(e) => updateWorkExperience(exp.id, 'endDate', e.target.value)}
                  disabled={exp.isCurrentJob}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 text-sm"
                />
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exp.isCurrentJob}
                  onChange={(e) => updateWorkExperience(exp.id, 'isCurrentJob', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Currently working here</span>
              </label>
            </div>
            
            {/* Bullet Points */}
            <div className="mt-3 sm:mt-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Key Achievements & Responsibilities</label>
                <button
                  onClick={() => addBulletPoint(exp.id)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  + Add Point
                </button>
              </div>
              {exp.bulletPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <span className="text-gray-400">•</span>
                  <input
                    type="text"
                    placeholder="Describe your achievement or responsibility"
                    value={point}
                    onChange={(e) => updateBulletPoint(exp.id, index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  />
                  {exp.bulletPoints.length > 1 && (
                    <button
                      onClick={() => removeBulletPoint(exp.id, index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <textarea
              placeholder="Additional Job Description (Optional)"
              value={exp.description}
              onChange={(e) => updateWorkExperience(exp.id, 'description', e.target.value)}
              rows={3}
              className="w-full mt-3 sm:mt-4 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-sm"
            />
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Education</h2>
          </div>
          <button
            onClick={addEducation}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Education</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
        {cvData.education.map((edu) => (
          <div key={edu.id} className="mb-4 sm:mb-6 p-3 sm:p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-medium text-gray-800">Education #{cvData.education.indexOf(edu) + 1}</h3>
              <button
                onClick={() => removeEducation(edu.id)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
              <input
                type="text"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
              <input
                type="text"
                placeholder="Location"
                value={edu.location}
                onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
              <input
                type="date"
                placeholder="Graduation Date"
                value={edu.graduationDate}
                onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
              <input
                type="text"
                placeholder="GPA (Optional)"
                value={edu.gpa}
                onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
            </div>
            <textarea
              placeholder="Description (Optional)"
              value={edu.description}
              onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
              rows={2}
              className="w-full mt-3 sm:mt-4 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-sm"
            />
          </div>
        ))}
      </div>

      {/* Volunteering */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <HandHeart className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Volunteering</h2>
          </div>
          <button
            onClick={addVolunteering}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Volunteering</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
        {cvData.volunteering.map((vol) => (
          <div key={vol.id} className="mb-4 sm:mb-6 p-3 sm:p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-medium text-gray-800">Volunteering #{cvData.volunteering.indexOf(vol) + 1}</h3>
              <button
                onClick={() => removeVolunteering(vol.id)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Role/Position"
                value={vol.role}
                onChange={(e) => updateVolunteering(vol.id, 'role', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
              <input
                type="text"
                placeholder="Organization"
                value={vol.organization}
                onChange={(e) => updateVolunteering(vol.id, 'organization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
              <input
                type="text"
                placeholder="Location"
                value={vol.location}
                onChange={(e) => updateVolunteering(vol.id, 'location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
              <div className="flex gap-2">
                <input
                  type="date"
                  placeholder="Start Date"
                  value={vol.startDate}
                  onChange={(e) => updateVolunteering(vol.id, 'startDate', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                />
                <input
                  type="date"
                  placeholder="End Date"
                  value={vol.endDate}
                  onChange={(e) => updateVolunteering(vol.id, 'endDate', e.target.value)}
                  disabled={vol.isCurrentRole}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 text-sm"
                />
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={vol.isCurrentRole}
                  onChange={(e) => updateVolunteering(vol.id, 'isCurrentRole', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Currently volunteering here</span>
              </label>
            </div>
            
            {/* Bullet Points */}
            <div className="mt-3 sm:mt-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Key Activities & Achievements</label>
                <button
                  onClick={() => addVolunteeringBulletPoint(vol.id)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  + Add Point
                </button>
              </div>
              {vol.bulletPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <span className="text-gray-400">•</span>
                  <input
                    type="text"
                    placeholder="Describe your activity or achievement"
                    value={point}
                    onChange={(e) => updateVolunteeringBulletPoint(vol.id, index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  />
                  {vol.bulletPoints.length > 1 && (
                    <button
                      onClick={() => removeVolunteeringBulletPoint(vol.id, index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <textarea
              placeholder="Additional Description (Optional)"
              value={vol.description}
              onChange={(e) => updateVolunteering(vol.id, 'description', e.target.value)}
              rows={3}
              className="w-full mt-3 sm:mt-4 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-sm"
            />
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <Code className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Skills</h2>
          </div>
          <button
            onClick={addSkill}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Skill</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {cvData.skills.map((skill) => (
            <div key={skill.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <span className="text-lg">{getSkillIcon(skill.name)}</span>
              <input
                type="text"
                placeholder="Skill Name (e.g., JavaScript, Photoshop, Leadership)"
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
              <select
                value={skill.category}
                onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              >
                <option value="Technical">Technical</option>
                <option value="Soft Skills">Soft Skills</option>
                <option value="Tools">Tools</option>
              </select>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={skill.percentage}
                  onChange={(e) => updateSkill(skill.id, 'percentage', parseInt(e.target.value))}
                  className="w-16 sm:w-20"
                />
                <span className="text-sm font-medium text-gray-600 w-10">{skill.percentage}%</span>
              </div>
              <button
                onClick={() => removeSkill(skill.id)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <Languages className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Languages</h2>
          </div>
          <button
            onClick={addLanguage}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Language</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {cvData.languages.map((language) => (
            <div key={language.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <input
                type="text"
                placeholder="Language"
                value={language.name}
                onChange={(e) => updateLanguage(language.id, 'name', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
              <select
                value={language.proficiency}
                onChange={(e) => updateLanguage(language.id, 'proficiency', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              >
                <option value="Basic">Basic</option>
                <option value="Conversational">Conversational</option>
                <option value="Fluent">Fluent</option>
                <option value="Native">Native</option>
              </select>
              <button
                onClick={() => removeLanguage(language.id)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <Globe className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Social Media</h2>
          </div>
          <button
            onClick={addSocialMedia}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Social Media</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
        {cvData.socialMedia.map((social) => (
          <div key={social.id} className="mb-3 sm:mb-4 p-3 sm:p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-medium text-gray-800">Social Media #{cvData.socialMedia.indexOf(social) + 1}</h3>
              <button
                onClick={() => removeSocialMedia(social.id)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Platform (e.g., Twitter, Instagram)"
                value={social.platform}
                onChange={(e) => updateSocialMedia(social.id, 'platform', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
              <input
                type="text"
                placeholder="Username"
                value={social.username}
                onChange={(e) => updateSocialMedia(social.id, 'username', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
              <input
                type="url"
                placeholder="Profile URL"
                value={social.url}
                onChange={(e) => updateSocialMedia(social.id, 'url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Hobbies */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <Heart className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Hobbies & Interests</h2>
          </div>
          <button
            onClick={addHobby}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Hobby</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {cvData.hobbies.map((hobby, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Hobby or Interest"
                value={hobby}
                onChange={(e) => updateHobby(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
              <button
                onClick={() => removeHobby(index)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* References */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">References</h2>
          </div>
          <button
            onClick={addReference}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Reference</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
        {cvData.references.map((reference) => (
          <div key={reference.id} className="mb-4 sm:mb-6 p-3 sm:p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-medium text-gray-800">Reference #{cvData.references.indexOf(reference) + 1}</h3>
              <button
                onClick={() => removeReference(reference.id)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={reference.name}
                onChange={(e) => updateReference(reference.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
              <input
                type="text"
                placeholder="Position"
                value={reference.position}
                onChange={(e) => updateReference(reference.id, 'position', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
              <input
                type="text"
                placeholder="Company"
                value={reference.company}
                onChange={(e) => updateReference(reference.id, 'company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                value={reference.email}
                onChange={(e) => updateReference(reference.id, 'email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={reference.phone}
                onChange={(e) => updateReference(reference.id, 'phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <FolderOpen className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Projects</h2>
          </div>
          <button
            onClick={addProject}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Project</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
        {cvData.projects.map((project) => (
          <div key={project.id} className="mb-4 sm:mb-6 p-3 sm:p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-medium text-gray-800">Project #{cvData.projects.indexOf(project) + 1}</h3>
              <button
                onClick={() => removeProject(project.id)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Project Name"
                value={project.name}
                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
              <input
                type="text"
                placeholder="Technologies Used"
                value={project.technologies}
                onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
            </div>
            <input
              type="url"
              placeholder="Project Link (Optional)"
              value={project.link}
              onChange={(e) => updateProject(project.id, 'link', e.target.value)}
              className="w-full mt-3 sm:mt-4 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
            />
            <textarea
              placeholder="Project Description"
              value={project.description}
              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
              rows={3}
              className="w-full mt-3 sm:mt-4 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
};