import React, { useState, useEffect } from 'react';
import { PDFViewer, type DocumentProps } from '@react-pdf/renderer';

// Error boundary component to catch PDF rendering errors
class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
  onError: () => void;
}> {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error) {
    console.error("PDF Rendering Error:", error);
    this.props.onError();
  }
  
  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

interface PDFPreviewProps {
  children: React.ReactElement<DocumentProps>;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ children }) => {
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [, setRetryCount] = useState(0);

  // Reset error state when children change
  useEffect(() => {
    setErrorOccurred(false);
  }, [children]);

  // If there's an error, try to render a basic version
  if (errorOccurred) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center p-4">
        <div className="text-center mb-4">
          <p className="text-red-500 font-medium">PDF preview is temporarily unavailable</p>
          <p className="text-sm text-gray-500 mt-2">Your cover letter content is still being saved</p>
        </div>
        <button 
          onClick={() => {
            setErrorOccurred(false);
            setRetryCount(r => r + 1);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
        >
          Retry Preview
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary onError={() => setErrorOccurred(true)}>
      <div style={{ width: '100%', height: '100%', background: 'transparent' }}>
        <PDFViewer
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: 'transparent'
          }}
          showToolbar={false}
        >
          {children}
        </PDFViewer>
      </div>
    </ErrorBoundary>
  );
};

export default PDFPreview;