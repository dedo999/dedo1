import { useState, useEffect } from 'react';

interface ImageOptimizationOptions {
  src: string;
  fallback?: string;
  loading?: 'lazy' | 'eager';
}

export function useImageOptimization({ src, fallback, loading = 'lazy' }: ImageOptimizationOptions) {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };
    
    img.onerror = () => {
      if (fallback) {
        setImageSrc(fallback);
      } else {
        setHasError(true);
      }
      setIsLoading(false);
    };

    // Create WebP version URL
    const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    
    // Check if browser supports WebP
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const supportsWebP = ctx && canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    
    // Use WebP if supported and available, otherwise use original
    const optimizedSrc = supportsWebP ? webpSrc : src;
    
    img.src = optimizedSrc;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallback]);

  return {
    src: imageSrc,
    isLoading,
    hasError,
    loading
  };
}