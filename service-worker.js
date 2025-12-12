const CACHE_NAME = 'quiz-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './sounds.js',
  './quiz_data.js',
  './question_generator.js',
  './README.md',
  './qrcode.png',
  './manifest.webmanifest'
];

// Install: pré-cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate: limpar caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.map(k => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: cache-first strategy
self.addEventListener('fetch', event => {
  const request = event.request;

  // Ignore non-GET requests
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request)
        .then(networkRes => {
          // Se resposta válida, clone e guarde no cache
          if (!networkRes || networkRes.status !== 200 || networkRes.type === 'opaque') {
            return networkRes;
          }
          const cloned = networkRes.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, cloned));
          return networkRes;
        })
        .catch(() => {
          // fallback simples: se pedir HTML, devolve index.html do cache
          if (request.headers.get('accept') && request.headers.get('accept').includes('text/html')) {
            return caches.match('./index.html');
          }
        });
    })
  );
});
