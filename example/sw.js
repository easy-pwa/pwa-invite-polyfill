self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('test').then(cache => {
      return cache.add('./offline.html');
    })
  );
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match('./offline.html').then(
        (response) => response || new Response('')
      );
    })
  );
});
