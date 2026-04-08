import { useEffect, useState, useRef } from "react";

export function useImageCycle(images: string[], interval = 4000) {
  const [index, setIndex] = useState(0);
  const imagesRef = useRef(images);

  // Only restart timer if images array content actually changes
  useEffect(() => {
    const hasChanged = 
      images.length !== imagesRef.current.length ||
      images.some((img, i) => img !== imagesRef.current[i]);
    
    if (!hasChanged) return;
    
    imagesRef.current = images;
    setIndex(0); // Reset index when images change
    
    if (!images.length) return;

    const timer = setInterval(
      () => setIndex(i => (i + 1) % images.length),
      interval
    );

    return () => clearInterval(timer);
  }, [images, interval]);

  return images[index];
}