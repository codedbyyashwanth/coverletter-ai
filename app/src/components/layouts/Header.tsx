import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const Header: React.FC = () => {
    
    // Remove dark mode
    React.useEffect(() => {
        document.documentElement.classList.remove('dark');
    }, []);
    
    return (
        <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center">
            {/* Change gradient to black */}
            <span className="text-2xl font-bold text-black">
                CoverAI
            </span>
            </Link>
            
            <div className="flex items-center">
                <Button size="sm" variant="outline" asChild>
                    <Link to="/">Get Started</Link>
                </Button>
            </div>
        </div>
        </header>
    );
};


export default Header;