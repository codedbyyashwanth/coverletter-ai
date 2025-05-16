import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, FileText, Briefcase, PenTool } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/resume');
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          CoverAI
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Create perfect, personalized cover letters in seconds with AI
        </p>
        <Button 
          onClick={handleGetStarted} 
          size="lg" 
          className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="p-6 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow">
          <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-4 mb-4">
            <FileText className="h-8 w-8 text-purple-600 dark:text-purple-300" />
          </div>
          <h2 className="text-xl font-bold mb-2">Upload Resume</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Upload your resume and we'll automatically extract your skills and experience.
          </p>
        </Card>
        
        <Card className="p-6 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow">
          <div className="rounded-full bg-indigo-100 dark:bg-indigo-900 p-4 mb-4">
            <Briefcase className="h-8 w-8 text-indigo-600 dark:text-indigo-300" />
          </div>
          <h2 className="text-xl font-bold mb-2">Add Job Details</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Paste a job posting URL or enter job details manually to tailor your cover letter.
          </p>
        </Card>
        
        <Card className="p-6 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow">
          <div className="rounded-full bg-violet-100 dark:bg-violet-900 p-4 mb-4">
            <PenTool className="h-8 w-8 text-violet-600 dark:text-violet-300" />
          </div>
          <h2 className="text-xl font-bold mb-2">Generate & Customize</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Our AI generates a tailored cover letter that you can customize and export.
          </p>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          Why Use CoverAI?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">✨ Save Time</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Generate professional cover letters in seconds, not hours.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">🎯 Perfect Targeting</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Automatically tailored to match the job description and highlight relevant skills.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">🔍 ATS-Optimized</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Designed to pass through Applicant Tracking Systems and reach human recruiters.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">✏️ Full Control</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Edit and customize your cover letter to make it uniquely yours.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Ready to create your perfect cover letter?
        </h2>
        <Button 
          onClick={handleGetStarted} 
          size="lg" 
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
          Get Started Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default HomePage;