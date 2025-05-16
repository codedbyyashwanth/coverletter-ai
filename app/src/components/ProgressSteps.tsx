import React from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

interface Step {
    name: string;
    path: string;
    completed: boolean;
    current: boolean;
}

const ProgressSteps: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    
    // Determine current step number (0-based index)
    let currentStepIndex = 0;
    if (currentPath === '/job') currentStepIndex = 1;
    if (currentPath === '/cover-letter') currentStepIndex = 2;
    
    const steps: Step[] = [
        {
            name: 'Resume',
            path: '/resume',
            completed: ['/job', '/cover-letter'].includes(currentPath),
            current: currentPath === '/resume'
        },
        {
            name: 'Job Details',
            path: '/job',
            completed: ['/cover-letter'].includes(currentPath),
            current: currentPath === '/job'
        },
        {
            name: 'Cover Letter',
            path: '/cover-letter',
            completed: false,
            current: currentPath === '/cover-letter'
        }
    ];
    
    // Don't show progress steps on home or 404 pages
    if (currentPath === '/' || currentPath === '/404') {
        return null;
    }
    
    return (
        <div className="w-full max-w-md mx-auto mt-8 mb-12 px-4">
            <div className="relative">
                {/* Progress line - background (gray) */}
                <div className="absolute left-[6%] right-[6%] h-[1px] bg-gray-200 top-4"></div>
                
                {/* Progress line fill - based on current step */}
                <div 
                    className="absolute left-[14px] h-[1px] bg-black top-4 transition-all duration-500 ease-in-out"
                    style={{ 
                        width: currentStepIndex === 0 ? '0' : 
                               currentStepIndex === 1 ? 'calc(50% - 14px)' : 
                               'calc(100% - 28px)'
                    }}
                ></div>
                
                {/* Steps container with equal spacing */}
                <div className="flex justify-between">
                    {steps.map((step, index) => (
                        <StepItem 
                            key={index}
                            number={index + 1}
                            name={step.name}
                            completed={step.completed}
                            current={step.current}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

// Separate component for each step to ensure consistent rendering
interface StepItemProps {
    number: number;
    name: string;
    completed: boolean;
    current: boolean;
}

const StepItem: React.FC<StepItemProps> = ({ number, name, completed, current }) => {
    return (
        <div className="relative flex flex-col items-center z-10 w-20">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full 
                ${completed 
                    ? 'bg-black text-white' 
                    : current 
                        ? 'border-2 border-black bg-white' 
                        : 'border border-gray-300 bg-white text-gray-400'}`}>
                {completed ? (
                    <CheckCircle className="w-5 h-5" />
                ) : (
                    <span className="text-sm font-medium">{number}</span>
                )}
            </div>
            <div className="mt-2 h-5 text-center">
                <span className={`text-sm font-medium truncate ${
                    current ? 'text-black' : 
                    completed ? 'text-gray-700' : 'text-gray-400'
                }`}>
                    {name}
                </span>
            </div>
        </div>
    );
};

export default ProgressSteps;