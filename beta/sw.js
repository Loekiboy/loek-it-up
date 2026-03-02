const CACHE_NAME = 'loek-it-up-beta-v5';

// Lokale assets — moeten slagen voor install
const LOCAL_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './confetti.js',
  './images/logo.svg',
  './images/fav.png',
  './fonts/fontawesome/css/all.min.css',
  './fonts/fontawesome/webfonts/fa-solid-900.woff2',
  './fonts/fontawesome/webfonts/fa-regular-400.woff2',
  './fonts/fontawesome/webfonts/fa-brands-400.woff2',
  './dictonary/eng-nld.json',
  './dictonary/nld-eng.json',
  './dictonary/deu-nld.json',
  './dictonary/nld-deu.json',
  './dictonary/fra-nld.json',
  './dictonary/nld-fra.json',
];

// Externe assets — optioneel, falen blokkeert install NIET
const EXTERNAL_ASSETS = [];

// Font Awesome webfonts pattern
const FA_WEBFONT_PATTERN = /font-awesome/;

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
  const isFontAwesome = FA_WEBFONT_PATTERN.test(url.href);

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Stale-while-revalidate voor externe assets (Font Awesome, etc.)
        if (isExternal) {
          fetch(event.request).then(networkResponse => {
            if (networkResponse && networkResponse.ok) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
            }
          }).catch(() => { /* achtergrond update mislukt, geen probleem */ });
        }
        return cachedResponse;
      }

      return fetch(event.request).then(response => {
        // Cache same-origin responses
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
        }
        // Cache ook cross-origin responses voor Font Awesome (CSS + woff2 fonts) en andere CDN resources
        if (response && (response.status === 200 || response.type === 'opaque') && isExternal) {
          if (isFontAwesome || response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
          }
        }
        return response;
      }).catch(() => {
        if (isExternal) {
          return new Response('', { status: 408, statusText: 'Offline' });
        }
        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
      });
    })
  );
});