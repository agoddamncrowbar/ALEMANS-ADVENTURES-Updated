import type { Safari } from "../types/safari";
import { getSafariStartingPrice } from "../utils/pricing";
import { useState } from "react";

interface SafariCardProps {
  safari: Safari;
  onClick: (safari: Safari) => void;
}

export default function SafariCard({ safari, onClick }: SafariCardProps) {
  const startingPrice = getSafariStartingPrice(safari);
  const imageSrc = safari.images?.[0]?.src ?? "/images/placeholder.jpg";
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    console.error(`Failed to load image: ${imageSrc}`);
    setImgError(true);
    setImgLoaded(true); // Hide skeleton
  };

  return (
    <div 
      onClick={() => onClick(safari)}
      className="block bg-white shadow-sm hover:shadow-lg transition overflow-hidden group cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {/* Skeleton - only show if image not loaded AND no error */}
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}
        
        <img
          src={imageSrc}
          alt={safari.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={handleImageError}
          className={`h-full w-full object-cover transition-all duration-700 
            ${imgLoaded ? "opacity-100" : "opacity-0"}
            group-hover:scale-105`}
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-medium">{safari.title}</h3>

        <p className="text-sm text-gray-600">{safari.durationLabel}</p>

        {startingPrice && (
          <p className="text-sm font-semibold text-[#1A0A0B]">
            From {startingPrice.currency} {startingPrice.amount}
            <span className="block text-xs text-gray-500">
              Price varies by season & group size
            </span>
          </p>
        )}

        {safari.highlights && safari.highlights.length > 0 && (
          <ul className="text-xs text-gray-500 list-disc pl-4">
            {safari.highlights.slice(0, 2).map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        )}

        <span className="text-sm underline tracking-wide text-[#1A0A0B]">
          View Details →
        </span>
      </div>
    </div>
  );
}