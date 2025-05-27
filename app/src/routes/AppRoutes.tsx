import React, { Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainLayout from '@/components/layouts/MainLayout';
import { selectCurrentResume } from '@/store/slices/resumeSlice';
import { selectCurrentJob } from '@/store/slices/jobSlice';

// Pages
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';

// Lazy-loaded feature pages
const ResumePage = React.lazy(() => import('@/pages/ResumePage'));
const JobPage = React.lazy(() => import('@/pages/JobPage'));
const CoverLetterPage = React.lazy(() => import('@/pages/CoverLetterPage'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Path protection component
const ProtectedRoute: React.FC<{
  element: React.ReactNode;
  requiredData?: {
    resume?: boolean;
    job?: boolean;
  };
}> = ({ element, requiredData = {} }) => {
  const resumeData = useSelector(selectCurrentResume);
  const jobData = useSelector(selectCurrentJob);
  const location = useLocation();

  if (requiredData.resume && !resumeData) {
    return <Navigate to="/resume" state={{ from: location }} replace />;
  }

  if (requiredData.job && !jobData) {
    return <Navigate to="/job" state={{ from: location }} replace />;
  }

  return <>{element}</>;
};

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
            <ProtectedRoute 
              element={<JobPage />}
              requiredData={{ resume: true }}
            />
          </Suspense>
        } />
        
        <Route path="cover-letter" element={
          <Suspense fallback={<LoadingFallback />}>
            <ProtectedRoute 
              element={<CoverLetterPage />}
              requiredData={{ resume: true, job: true }}
            />
          </Suspense>
        } />
        
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;