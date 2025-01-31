import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Loader } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
  modelType: string;
  onModelChange: (model: string) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  isProcessing,
  modelType,
  onModelChange,
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav'],
      'video/*': ['.mp4']
    },
    maxFiles: 1,
  });

  return (
    <div className="w-full max-w-xl mx-auto bg-gray-50 p-6 rounded-lg shadow-medium">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary-700 bg-blue-50' : 'border-secondary-200'}
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary-700 hover:bg-blue-50'}`}
      >
        <input {...getInputProps()} disabled={isProcessing} />
        <div className="flex flex-col items-center space-y-4">
          {isProcessing ? (
            <Loader className="w-12 h-12 text-primary-900 animate-spin" />
          ) : (
            <Upload className="w-12 h-12 text-primary-900" />
          )}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-secondary-900">
              {isProcessing ? 'Processing...' : 'Upload Audio File'}
            </h3>
            <p className="text-sm text-secondary-700">
              Support for MP3, WAV, and MP4 files
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-secondary-900 mb-2">
          Model Options
        </label>
        <select
          value={modelType}
          onChange={(e) => onModelChange(e.target.value)}
          className="w-full p-3 border border-secondary-200 rounded-lg bg-white text-secondary-900 shadow-light focus:border-primary-700 focus:ring-1 focus:ring-primary-700 transition-colors"
          disabled={isProcessing}
        >
          <option value="whisper-medium">Whisper Medium</option>
          <option value="whisper-large-v2">Whisper Large V2 (8-bit)</option>
        </select>
      </div>
    </div>
  );
};