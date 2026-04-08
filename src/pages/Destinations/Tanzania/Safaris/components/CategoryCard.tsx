import type { Category } from "../types/safari";
import { collectCategoryImages } from "../utils/images";
import { useImageCycle } from "../hooks/useImageCycle";
import { useState } from "react";

export default function CategoryCard({
  category,
  onSelect
}: {
  category: Category;
  onSelect: (id: string) => void;
}) {
  const images = collectCategoryImages(category);
  const activeImage = useImageCycle(images);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    console.error(`Failed to load image: ${activeImage}`);
    setImgError(true);
    setImgLoaded(true); // Hide skeleton
  };

  return (
    <div
      onClick={() => onSelect(category.id)}
      className="group cursor-pointer bg-white shadow-md hover:shadow-xl transition overflow-hidden"
    >
      <div className="relative h-60 overflow-hidden bg-gray-100">
        
        {/* Skeleton - only show if image not loaded AND no error */}
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}

        {activeImage && !imgError && (
          <img
            key={activeImage}
            src={activeImage}
            alt={category.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            onError={handleImageError}
            className={`absolute inset-0 w-full h-full object-cover 
              transition-all duration-700
              ${imgLoaded ? "opacity-100" : "opacity-0"}
              group-hover:scale-105`}
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium tracking-wide">
          {category.title}
        </h3>

        {category.description && (
          <p className="text-sm text-gray-600 mt-1">
            {category.description}
          </p>
        )}
      </div>
    </div>
  );
}