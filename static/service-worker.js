const CORE_CACHE_VERSION = 'v1'
const CORE_ASSETS = [
    '/',
    '/movies',
    '/series',
    '/offline',
    '/css/index.css'
]

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CORE_CACHE_VERSION)
            .then(cache => cache.addAll(CORE_ASSETS))
            .then(() => self.skipWaiting())
    )
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then(CORE_CACHE_VERSIONS => {
                CORE_CACHE_VERSIONS.map(VERSION => {
                    if (VERSION !== CORE_CACHE_VERSION) {
                        return caches.delete(VERSION)
                    }
                })
            })
    )
})

self.addEventListener('fetch', (event) => {
    if (CORE_ASSETS.includes(getPathName(event.request.url))) {
        event.respondWith(
            caches.open(CORE_CACHE_VERSION)
                .then(cache => cache.match(event.request.url))
        )
    } else if ((!CORE_ASSETS.includes(getPathName(event.request.url))) && event.request.headers.get('accept').indexOf('text/html') > -1) {
        event.respondWith(
            caches.open(CORE_CACHE_VERSION)
                .then(() => caches.open(CORE_CACHE_VERSION)
                    .then(cache => cache.match('/offline'))
                )
        )
    }
})

function getPathName(requestUrl) {
    const url = new URL(requestUrl)
    return url.pathname
}