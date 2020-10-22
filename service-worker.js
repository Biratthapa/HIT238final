var cacheName = 'v2';
var cacheFiles=[
  './',
  './index.html',
  './style.css',
  './guitars.html',
  './laptop.html',
  './smartphones.html'
  './js/catalogue.js',
  './js/product.js',
  './js/test.js',
  'https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
]

self.addEventListener('install', function(e) {
  console.log('Service Worker:Installed');
  e.waitUntil(

    caches.open(cacheName).then(function(cache){
      console.log("[ServiceWorker] Caching cacheFiles");
      return cache.addAll(cacheFiles);
    })
  )
})

self.addEventListener('activate', function(e) {
  console.log('Service Worker:Activated');
  e.waitUntil(

    caches.keys().then(function(cacheNames){
       return Promise.all(cacheNames.map(function(thisCacheName){
         if (thisCacheName !== cacheName) {
           console.log("[ServiceWorker] Removing Cached Files from", thisCacheName);
           return caches.delete(thisCacheName);
         }
       }))
    })
  )
})

self.addEventListener('fetch', function(e) {
  console.log('Service Worker: fetching', e.request.url);
})
