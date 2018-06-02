var cacheName = 'entregAPP';
var filesToCache = [
    './',
    './css/semantic.min.css',
    './css/themes/default/assets/fonts/brand-icons.eot',
    './css/themes/default/assets/fonts/brand-icons.svg',
    './css/themes/default/assets/fonts/brand-icons.ttf',
    './css/themes/default/assets/fonts/brand-icons.woff',
    './css/themes/default/assets/fonts/brand-icons.woff2',
    './css/themes/default/assets/fonts/icons.eot',
    './css/themes/default/assets/fonts/icons.otf',
    './css/themes/default/assets/fonts/icons.svg',
    './css/themes/default/assets/fonts/icons.ttf',
    './css/themes/default/assets/fonts/icons.woff',
    './css/themes/default/assets/fonts/icons.woff2',
    './css/themes/default/assets/fonts/outline-icons.eot',
    './css/themes/default/assets/fonts/outline-icons.svg',
    './css/themes/default/assets/fonts/outline-icons.ttf',
    './css/themes/default/assets/fonts/outline-icons.woff',
    './css/themes/default/assets/fonts/outline-icons.woff2',
    './css/themes/default/assets/images/flags.png',
    './images/icons/icon-128x128.png',
    './images/icons/icon-144x144.png',
    './images/icons/icon-152x152.png',
    './images/icons/icon-192x192.png',
    './images/icons/icon-384x384.png',
    './images/icons/icon-512x512.png',
    './images/icons/icon-72x72.png',
    './images/icons/icon-96x96.png',
    './js/jquery-3.3.1.min.js',
    './js/logica.js',
    './js/semantic.min.js',
    './index.html'
];
self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});
self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});
