import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { JobData } from '@/types/job';
import { Loader, X } from 'lucide-react';

interface JobDetailsFormProps {
  initialJobData: JobData | null;
  onSubmit: (jobData: JobData) => void;
}

export const JobDetailsForm: React.FC<JobDetailsFormProps> = ({
  initialJobData,
  onSubmit,
}) => {
  const [jobData, setJobData] = useState<JobData>({
    company: '',
    position: '',
    location: '',
    description: '',
    requirements: [],
    skills: [],
  });
  const [newRequirement, setNewRequirement] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form when initialJobData changes
  useEffect(() => {
    if (initialJobData) {
      setJobData({
        ...initialJobData,
        // Ensure these are arrays even if they are undefined in initialJobData
        requirements: initialJobData.requirements || [],
        skills: initialJobData.skills || [],
      });
    }
  }, [initialJobData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      setJobData((prev) => ({
        ...prev,
        requirements: [...(prev.requirements || []), newRequirement.trim()],
      }));
      setNewRequirement('');
    }
  };

  const handleRemoveRequirement = (index: number) => {
    setJobData((prev) => ({
      ...prev,
      requirements: prev.requirements?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setJobData((prev) => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index: number) => {
    setJobData((prev) => ({
      ...prev,
      skills: prev.skills?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate required fields
    if (!jobData.company || !jobData.position) {
      alert('Company and Position are required fields');
      setIsSubmitting(false);
      return;
    }
    
    onSubmit(jobData);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="company" className="block text-sm font-medium">
            Company*
          </label>
          <Input
            id="company"
            name="company"
            value={jobData.company}
            onChange={handleChange}
            placeholder="Company name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="position" className="block text-sm font-medium">
            Position*
          </label>
          <Input
            id="position"
            name="position"
            value={jobData.position}
            onChange={handleChange}
            placeholder="Job title"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="location" className="block text-sm font-medium">
          Location
        </label>
        <Input
          id="location"
          name="location"
          value={jobData.location || ''}
          onChange={handleChange}
          placeholder="Job location (remote, city, etc.)"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium">
          Job Description
        </label>
        <Textarea
          id="description"
          name="description"
          value={jobData.description || ''}
          onChange={handleChange}
          placeholder="Enter the job description here"
          rows={5}
        />
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Requirements</label>
          <div className="flex space-x-2">
            <Input
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              placeholder="Add a job requirement"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddRequirement();
                }
              }}
            />
            <Button 
              type="button" 
              onClick={handleAddRequirement}
              variant="outline"
            >
              Add
            </Button>
          </div>
        </div>
        
        {jobData.requirements && jobData.requirements.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Current Requirements:</p>
            <ul className="space-y-2">
              {jobData.requirements.map((req, index) => (
                <li 
                  key={index} 
                  className="flex items-center bg-gray-50 dark:bg-gray-800 p-2 rounded"
                >
                  <span className="flex-1 text-sm">{req}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveRequirement(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Skills</label>
          <div className="flex space-x-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a required skill"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
            />
            <Button 
              type="button" 
              onClick={handleAddSkill}
              variant="outline"
            >
              Add
            </Button>
          </div>
        </div>
        
        {jobData.skills && jobData.skills.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Required Skills:</p>
            <div className="flex flex-wrap gap-2">
              {jobData.skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    className="ml-2 text-primary hover:text-primary/80"
                    onClick={() => handleRemoveSkill(index)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="pt-4">
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Job Details'
          )}
        </Button>
      </div>
    </form>
  );
};