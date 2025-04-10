const CACHE_NAME = 'wimbledon-v1';
const OFFLINE_PAGE = 'offline_message.html';

const filesToCache = [
    'manifest.json',
    'index.html',
    OFFLINE_PAGE,
    'css/main.css',
    'icons/wimbledon_app_icon.png'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching core files');
                return cache.addAll(filesToCache)
                    .catch(err => {
                        console.error('Failed to cache some files:', err);
                    });
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => Promise.all(
                keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)
            )
        ));
});

self.addEventListener('fetch', e => {
    // Skip non-GET requests
    if (e.request.method !== 'GET') return;

    e.respondWith(
        caches.match(e.request)
            .then(cached => {
                // Return cached if available
                if (cached) return cached;

                // Otherwise fetch from network
                return fetch(e.request)
                    .catch(() => {
                        // Special handling for HTML requests
                        if (e.request.headers.get('accept').includes('text/html')) {
                            return caches.match(OFFLINE_PAGE);
                        }
                    });
            })
    );
});