import React from 'react';
import type { ResumeData } from '@/types/resume';
import { Card } from '@/components/ui/card';
import { Loader } from 'lucide-react';

interface ResumePreviewProps {
  resumeData: ResumeData | null;
  isLoading?: boolean;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  resumeData,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
        <Loader className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-gray-500">Extracting resume data...</p>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full min-h-[300px]">
        <p className="text-gray-500 mb-2">No resume uploaded yet</p>
        <p className="text-gray-400 text-sm">
          Upload your resume to see a preview of the extracted information
        </p>
      </div>
    );
  }

  // Get all skills
  const skills = Array.isArray(resumeData.skills) ? resumeData.skills : [];

  return (
    <div className="space-y-6 max-h-[500px] overflow-auto pr-2">
      {/* Personal Info */}
      <div>
        <h3 className="text-lg font-semibold mb-2">{resumeData.name}</h3>
        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
          {resumeData.email && <span>{resumeData.email}</span>}
          {resumeData.email && resumeData.phone && <span>•</span>}
          {resumeData.phone && <span>{resumeData.phone}</span>}
        </div>
      </div>

      {/* Profile Summary */}
      {resumeData.profile && (
        <div>
          <h4 className="text-md font-medium mb-2">Profile</h4>
          <p className="text-sm text-gray-700">{resumeData.profile}</p>
        </div>
      )}

      {/* Skills - now using the simplified structure */}
      {skills.length > 0 && (
        <div>
          <h4 className="text-md font-medium mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2 mt-1">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div>
          <h4 className="text-md font-medium mb-2">Experience</h4>
          <div className="space-y-4">
            {resumeData.experience.map((exp, index) => (
              <Card key={index} className="p-3 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="text-sm font-semibold">{exp.position}</h5>
                    <p className="text-xs text-gray-600">{exp.company}</p>
                  </div>
                  {(exp.startDate || exp.endDate) && (
                    <p className="text-xs text-gray-500">
                      {exp.startDate || 'N/A'} - {exp.endDate || 'Present'}
                    </p>
                  )}
                </div>
                {exp.description && (
                  <ul className="mt-2 pl-5 text-xs text-gray-700 list-disc space-y-1">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Note about editing */}
      <p className="text-xs text-gray-500 italic mt-4">
        This is a preview of the data extracted from your resume. You'll have the chance to review and edit this information later.
      </p>
    </div>
  );
};