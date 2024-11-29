import React from 'react';

interface ModalProps {
  imageUrl: string;
  onClose: () => void;
}

export function Modal({ imageUrl, onClose }: ModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="relative bg-white p-4 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-white"
          onClick={onClose}
        >
          ×
        </button>
        <img src={imageUrl} alt="Enlarged View" className="max-w-full max-h-screen" />
      </div>
    </div>
  );
}
