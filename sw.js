const CACHE_NAME = 'loek-it-up-v3';

// Lokale assets — moeten slagen voor install
const LOCAL_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './confetti.js',
  './images/logo.svg',
  './images/fav.png',
  './dictonary/eng-nld.json',
  './dictonary/nld-eng.json',
  './dictonary/deu-nld.json',
  './dictonary/nld-deu.json',
  './dictonary/fra-nld.json',
  './dictonary/nld-fra.json',
];

// Externe assets — optioneel, falen blokkeert install NIET
const EXTERNAL_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
];

// Install event: cache lokale assets (must succeed) + externe assets (best-effort)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log('Opened cache');
      // Lokale bestanden moeten slagen
      await cache.addAll(LOCAL_ASSETS);
      // Externe bestanden: probeer te cachen, maar falen is geen blocker
      await Promise.allSettled(
        EXTERNAL_ASSETS.map(url =>
          fetch(url, { mode: 'cors' })
            .then(res => {
              if (res.ok) return cache.put(url, res);
            })
            .catch(err => console.warn('Extern asset niet gecached:', url, err))
        )
      );
    })
  );
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: cache-first + stale-while-revalidate voor externe CDN resources
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const isExternal = url.origin !== self.location.origin;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Stale-while-revalidate voor externe assets (Font Awesome, etc.)
        if (isExternal) {
          const fetchPromise = fetch(event.request).then(networkResponse => {
            if (networkResponse && networkResponse.ok) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
            }
            return networkResponse;
          }).catch(() => cachedResponse);
          // Stuur direct cached versie, update op achtergrond
        }
        return cachedResponse;
      }

      return fetch(event.request).then(response => {
        // Cache same-origin responses
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
        }
        // Cache ook cross-origin (opaque/cors) responses voor Font Awesome fonts etc.
        if (response && response.status === 200 && isExternal) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
        }
        return response;
      });
    })
  );
});