// service-worker.js

// Define the cache name for your static assets
const CACHE_NAME = 'mock_tool_digikull';

// List the static assets you want to cache
const staticAssets = [
  '/',
  "/index.html",
  "/static/media/bullseye.dbfba93a0b3928b0ee21abe98cd4472a.svg",
  "/static/media/mongodb.05bb8082717be74f84d16aff62a8f5a5.svg",
  "/logo192.png",
  "/logo512.png",
  "/favicon.ico"
  // Add other static assets here
];

// Install event - cache the static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(staticAssets);
    })
  );
});

// Activate event - clean up old caches
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

// Fetch event - serve static assets from cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
