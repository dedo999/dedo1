// Performance optimization utilities

// Debounce function for scroll events
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function for resize events
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Lazy loading intersection observer
export function createLazyLoadObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
}

// Preload critical resources
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Check if device is mobile
export function isMobileDevice(): boolean {
  return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Check network connection
export function getNetworkInfo(): { effectiveType?: string; downlink?: number } {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (connection) {
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
    };
  }
  
  return {};
}

// Optimize images based on device and network
export function getOptimizedImageSrc(originalSrc: string, isMobile: boolean, isSlowConnection: boolean): string {
  const extension = originalSrc.split('.').pop()?.toLowerCase();
  const baseName = originalSrc.replace(/\.[^/.]+$/, '');
  
  // Use WebP if supported
  const supportsWebP = (() => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  })();
  
  if (supportsWebP) {
    if (isMobile || isSlowConnection) {
      return `${baseName}-mobile.webp`;
    }
    return `${baseName}.webp`;
  }
  
  // Fallback to smaller versions for mobile/slow connections
  if (isMobile || isSlowConnection) {
    return `${baseName}-mobile.${extension}`;
  }
  
  return originalSrc;
}

// Critical resource hints
export function addResourceHints(): void {
  const head = document.head;
  
  // Preconnect to external domains
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ];
  
  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    head.appendChild(link);
  });
  
  // DNS prefetch for external resources
  const dnsPrefetchDomains = [
    'https://wa.me',
    'https://maps.google.com',
  ];
  
  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    head.appendChild(link);
  });
}

// Service Worker registration for caching
export function registerServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}

// Critical CSS inlining
export function inlineCriticalCSS(): void {
  const criticalCSS = `
    /* Critical above-the-fold styles */
    .hero-section { 
      min-height: 100vh; 
      background: linear-gradient(135deg, #1f1f1f 0%, #000 100%);
    }
    .kaizen-red { color: #dc2626; }
    .kaizen-gold { color: #fbbf24; }
    .bg-kaizen-darker { background-color: #0f0f0f; }
    .bg-kaizen-dark { background-color: #1a1a1a; }
    
    /* Mobile-first responsive typography */
    @media (max-width: 640px) {
      h1 { font-size: 1.5rem; }
      h2 { font-size: 1.25rem; }
      p { font-size: 0.875rem; }
    }
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);
}