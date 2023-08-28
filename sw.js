const cacheName = "Eu e as Velhas";
const filesToCache = ["/", "/index.html", "/css/style.css", "/js/index.js"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

