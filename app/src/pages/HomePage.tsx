import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
    // Ensure light mode
    React.useEffect(() => {
        document.documentElement.classList.remove('dark');
    }, []);
    
    return (
        <header className="border-b bg-white">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <span className="text-2xl font-bold text-black">
                        CoverAI
                    </span>
                </Link>
                
                {/* Navigation links removed */}
                
                <Button size="sm" variant="outline" asChild>
                    <Link to="/">Get Started</Link>
                </Button>
            </div>
        </header>
    );
};

export default Header;