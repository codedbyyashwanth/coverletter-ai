import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';

const Header: React.FC = () => {
    const location = useLocation();
    
    return (
        <header className="border-b bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                CoverAI
            </span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" currentPath={location.pathname}>
                Home
            </NavLink>
            <NavLink to="/resume" currentPath={location.pathname}>
                Resume
            </NavLink>
            <NavLink to="/job" currentPath={location.pathname}>
                Job Details
            </NavLink>
            <NavLink to="/cover-letter" currentPath={location.pathname}>
                Cover Letter
            </NavLink>
            </nav>
            
            <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button size="sm" variant="outline" asChild>
                <Link to="/">Get Started</Link>
            </Button>
            </div>
        </div>
        </header>
    );
};

interface NavLinkProps {
  to: string;
  currentPath: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, currentPath, children }) => {
    const isActive = currentPath === to || (currentPath.startsWith(to) && to !== '/');
    
    return (
        <Link
        to={to}
        className={`text-sm font-medium transition-colors hover:text-primary ${
            isActive
            ? 'text-primary'
            : 'text-gray-600 dark:text-gray-300'
        }`}
        >
        {children}
        </Link>
    );
};

// Simple theme toggle component
const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
    
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };
    
    React.useEffect(() => {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(isDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', isDark);
    }, []);
    
    return (
        <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
        aria-label="Toggle theme"
        >
        {theme === 'light' ? (
            <span role="img" aria-label="Moon">🌙</span>
        ) : (
            <span role="img" aria-label="Sun">☀️</span>
        )}
        </button>
    );
};

export default Header;