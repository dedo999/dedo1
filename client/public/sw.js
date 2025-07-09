// Service Worker for caching and mobile performance
const CACHE_NAME = 'kaizen-burgos-v1';
const urlsToCache = [
  '/',
  '/kaizen-logo-transparent.png',
  '/kaizen_logo_hero.png',
  '/mma-image.jpg',
  '/bjj-image-new.webp',
  '/kickboxing-image.webp',
  '/boxeo-image.webp',
  '/antonio-alonso-instructor.webp',
  '/pablo-mate-instructor.webp',
  '/eduardo-cortes-instructor.webp',
  '/ruben-sancho-instructor.webp',
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});