import React, { useState } from 'react';
import type { Image } from '../types';
import { Modal } from './modal'; // Import the Modal

interface GalleryProps {
  images: Image[];
}

export function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl); // Set the clicked image to show in modal
  };

  const closeModal = () => {
    setSelectedImage(null); // Close modal
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative group aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
            onClick={() => handleImageClick(image.url)}
          >
            <img
              src={image.url}
              alt={image.title || 'Image'}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-medium">
                  {new Date(image.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Render Modal if an image is selected */}
      {selectedImage && <Modal imageUrl={selectedImage} onClose={closeModal} />}
    </div>
  );
}
