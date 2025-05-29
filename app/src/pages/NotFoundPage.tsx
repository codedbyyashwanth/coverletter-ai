import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto py-16 px-4 flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-6xl md:text-8xl font-bold text-gray-200 dark:text-gray-800">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-2">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Button 
        onClick={handleGoHome}
        className="flex items-center cursor-pointer"
      >
        <Home className="mr-2 h-4 w-4" />
        Go to Home Page
      </Button>
    </div>
  );
};

export default NotFoundPage;