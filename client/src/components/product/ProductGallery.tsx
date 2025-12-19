import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface ProductGalleryProps {
  imageUrls: string[];
  productName: string;
}

const ProductGallery = ({ imageUrls, productName }: ProductGalleryProps) => {
  // Support backward compatibility with imageUrl
  const images = imageUrls && imageUrls.length > 0 ? imageUrls : [];
  const [selectedImage, setSelectedImage] = useState(images[0] || null);

  useEffect(() => {
    if (images.length > 0 && !selectedImage) {
      setSelectedImage(images[0]);
    }
  }, [images, selectedImage]);

  if (images.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">No Image Available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={selectedImage ? `http://localhost:5000${selectedImage}` : undefined}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={cn(
              "aspect-square overflow-hidden rounded-lg border-2 transition-all",
              selectedImage === img
                ? "border-primary"
                : "border-transparent hover:border-gray-300"
            )}
          >
            <img
              src={`http://localhost:5000${img}`}
              alt={`${productName} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
        {/* Fill remaining slots if less than 5 images */}
        {images.length < 5 && Array.from({ length: 5 - images.length }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="aspect-square overflow-hidden rounded-lg border-2 border-transparent opacity-30 bg-gray-100"
          >
            <img
              src={`http://localhost:5000${images[images.length - 1]}`}
              alt={`${productName} placeholder`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;

