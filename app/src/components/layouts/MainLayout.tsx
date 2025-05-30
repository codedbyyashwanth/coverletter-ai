import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ProgressSteps from '../ProgressSteps';

const MainLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <ProgressSteps />
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;