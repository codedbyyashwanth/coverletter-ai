import React, { useState } from 'react';
import { Button } from './button';
import { Upload, File, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelected: (file: File | null) => void;  // Modified to accept null
  accept?: string;
  maxSize?: number; // in bytes
  className?: string;
  label?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelected,
  accept = '.pdf,.doc,.docx',
  maxSize = 5 * 1024 * 1024, // 5MB default
  className = '',
  label = 'Upload a file',
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file: File) => {
    setError(null);
    
    // Check file type
    const fileType = file.type;
    const validTypes = accept.split(',').map(type => type.trim().replace('.', ''));
    const isValidType = validTypes.some(type => fileType.includes(type) || file.name.endsWith(type));
    
    if (!isValidType) {
      setError(`Invalid file type. Accepted types: ${accept}`);
      return;
    }
    
    // Check file size
    if (file.size > maxSize) {
      setError(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`);
      return;
    }
    
    setSelectedFile(file);
    onFileSelected(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    validateAndSetFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = () => {
    setSelectedFile(null);
    onFileSelected(null); // Pass null to the parent component
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
        ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}
        ${selectedFile ? 'bg-gray-50' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        {selectedFile ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <File className="h-8 w-8 text-primary" />
              <div className="ml-3 text-left">
                <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
            >
              <X className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        ) : (
          <div>
            <Upload className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2 text-sm font-medium text-gray-900">{label}</p>
            <p className="mt-1 text-xs text-gray-500">
              Drag and drop or click to browse
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Max size: {maxSize / (1024 * 1024)}MB
            </p>
          </div>
        )}
        <input
          id="file-input"
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};