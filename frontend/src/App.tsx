import React, { useState, useEffect } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { Gallery } from './components/Gallery';
import { Palette } from 'lucide-react';
import type { Image } from './types';

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all images from the backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/upload/images"); // Adjust endpoint as needed
        const data = await response.json();

        if (response.ok) {
          setImages(data.images);
        } else {
          setError(data.message || 'Failed to load images.');
        }
      } catch (err) {
        setError('Error fetching images.');
        console.error('Fetch error:', err);
      }
    };

    fetchImages();
  }, []);

  // Handle file upload
  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('imageFile', file); // Must match the name used in your backend

      const response = await fetch("http://localhost:4000/api/v1/upload/imageUpload", {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        const newImage: Image = {
          id: data.imageUrl, // Use `imageUrl` as a unique identifier or add one from backend
          url: data.imageUrl,
          uploadedAt: new Date().toISOString(),
        };
        setImages((prev) => [newImage, ...prev]);
      } else {
        setError(data.message || 'Failed to upload image.');
      }
    } catch (err) {
      setError('Error uploading image.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Palette className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Fashion Gallery</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload New Design</h2>
            <ImageUpload onUpload={handleUpload} isUploading={isUploading} />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Designs</h2>
            {images.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No images uploaded yet. Start by uploading your first design!
              </p>
            ) : (
              <Gallery images={images} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
