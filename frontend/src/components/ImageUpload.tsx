import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (file: File) => Promise<void>;
  isUploading: boolean;
}

export function ImageUpload({ onUpload, isUploading }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files?.[0]) {
      await onUpload(files[0]);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      await onUpload(files[0]);
    }
  };

  return (
    <div
      className={`relative rounded-lg border-2 border-dashed p-8 text-center ${
        dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={isUploading}
      />
      <div className="flex flex-col items-center justify-center gap-2">
        <Upload className="w-10 h-10 text-gray-400" />
        <p className="text-lg font-medium text-gray-700">
          {isUploading ? 'Uploading...' : 'Drag and drop your image here'}
        </p>
        <p className="text-sm text-gray-500">or click to select a file</p>
      </div>
    </div>
  );
}