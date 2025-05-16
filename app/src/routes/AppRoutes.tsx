import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';

// Pages
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';

// Lazy-loaded feature pages
const ResumePage = React.lazy(() => import('@/features/ResumePage'));
const JobPage = React.lazy(() => import('@/features/JobPage'));
const CoverLetterPage = React.lazy(() => import('@/features/CoverLetterPage'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        
        <Route path="resume" element={
          <Suspense fallback={<LoadingFallback />}>
            <ResumePage />
          </Suspense>
        } />
        
        <Route path="job" element={
          <Suspense fallback={<LoadingFallback />}>
            <JobPage />
          </Suspense>
        } />
        
        <Route path="cover-letter" element={
          <Suspense fallback={<LoadingFallback />}>
            <CoverLetterPage />
          </Suspense>
        } />
        
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;