import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HomePage: React.FC = () => {
    // Ensure light mode
    React.useEffect(() => {
        document.documentElement.classList.remove('dark');
    }, []);
    
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Create professional cover letters with AI
                </h1>
                <p className="text-lg mb-8 text-gray-600">
                    Upload your resume, paste a job description, and get a customized cover letter in seconds.
                </p>
                <Button size="lg" asChild>
                    <Link to="/resume">Get Started</Link>
                </Button>
            </div>
            
            {/* Add more landing page content here */}
        </div>
    );
};

export default HomePage;