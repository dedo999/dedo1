import { Suspense, lazy } from 'react';
import { throttle } from '@/utils/performance';

// Lazy load heavy components
const LazyInstructorsSection = lazy(() => import('@/components/instructors-section'));
const LazyScheduleSection = lazy(() => import('@/components/schedule-section'));
const LazyTestimonialsSection = lazy(() => import('@/components/testimonials-section'));
const LazyContactSection = lazy(() => import('@/components/contact-section'));

// Loading skeleton component
const LoadingSkeleton = ({ height = "h-64" }: { height?: string }) => (
  <div className={`${height} bg-kaizen-dark animate-pulse rounded-lg mx-4 my-8`}>
    <div className="p-6">
      <div className="h-8 bg-kaizen-darker rounded mb-4"></div>
      <div className="h-4 bg-kaizen-darker rounded mb-2"></div>
      <div className="h-4 bg-kaizen-darker rounded mb-2"></div>
      <div className="h-4 bg-kaizen-darker rounded w-3/4"></div>
    </div>
  </div>
);

interface MobilePerformanceWrapperProps {
  children: React.ReactNode;
}

export default function MobilePerformanceWrapper({ children }: MobilePerformanceWrapperProps) {
  // Throttled scroll handler to improve performance
  const handleScroll = throttle(() => {
    // Add any scroll-based performance optimizations here
    if (window.scrollY > 1000) {
      // Preload next section images
      const nextImages = document.querySelectorAll('img[data-src]');
      nextImages.forEach(img => {
        if (img.getBoundingClientRect().top < window.innerHeight * 1.5) {
          const src = img.getAttribute('data-src');
          if (src) {
            img.setAttribute('src', src);
            img.removeAttribute('data-src');
          }
        }
      });
    }
  }, 100);

  return (
    <div className="min-h-screen bg-kaizen-darker text-white" onScroll={handleScroll}>
      {children}
    </div>
  );
}

// Lazy-loaded sections with suspense boundaries
export const LazyInstructorsSectionWithSuspense = () => (
  <Suspense fallback={<LoadingSkeleton height="h-96" />}>
    <LazyInstructorsSection />
  </Suspense>
);

export const LazyScheduleSectionWithSuspense = () => (
  <Suspense fallback={<LoadingSkeleton height="h-80" />}>
    <LazyScheduleSection />
  </Suspense>
);

export const LazyTestimonialsSectionWithSuspense = () => (
  <Suspense fallback={<LoadingSkeleton height="h-72" />}>
    <LazyTestimonialsSection />
  </Suspense>
);

export const LazyContactSectionWithSuspense = () => (
  <Suspense fallback={<LoadingSkeleton height="h-96" />}>
    <LazyContactSection />
  </Suspense>
);