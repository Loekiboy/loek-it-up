const CACHE_NAME = 'loek-it-up-v10';

// Lokale assets — moeten slagen voor install
const LOCAL_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './confetti.js',
  './manifest.json',
  './images/logo.svg',
  './images/fav.png',
  './fonts/fontawesome/css/all.min.css',
  './fonts/fontawesome/webfonts/fa-solid-900.woff2',
  './fonts/fontawesome/webfonts/fa-regular-400.woff2',
  './fonts/fontawesome/webfonts/fa-brands-400.woff2',
];

// Externe assets — optioneel, falen blokkeert install NIET
const EXTERNAL_ASSETS = [];

// Font Awesome webfonts pattern (voor eventuele CDN fallback caching)
const FA_WEBFONT_PATTERN = /font-awesome/;

// Install event: cache lokale assets (must succeed) + externe assets (best-effort)
self.addEventListener('install', event => {
  self.skipWaiting(); // Activate new SW immediately
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

// Activate event: clean up old caches and claim clients
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
    }).then(() => self.clients.claim()) // Take control of all clients immediately
  );
});

// Fetch event: cache-first + stale-while-revalidate voor externe CDN resources
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const isExternal = url.origin !== self.location.origin;
  const isFontAwesome = FA_WEBFONT_PATTERN.test(url.href);
  const isNavigationRequest = event.request.mode === 'navigate';

  // Skip non-GET requests and Supabase API calls
  if (event.request.method !== 'GET' || url.hostname.includes('supabase.co')) {
    return;
  }

  // HTML navigaties: altijd eerst netwerk om witte pagina's door verouderde cache te voorkomen.
  // Bij netwerkfout valt hij terug op cache.
  if (isNavigationRequest) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
          });
        })
    );
    return;
  }

  // Externe resources (zoals CDN scripts/CSS): eerst netwerk.
  // Zo vermijden we dat verouderde of corrupte cache styling/JS breekt.
  if (isExternal) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && (response.status === 200 || response.type === 'opaque')) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            return Response.error();
          });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then(response => {
        // Cache same-origin responses
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
        }
        return response;
      }).catch(() => {
        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
      });
    })
  );
});