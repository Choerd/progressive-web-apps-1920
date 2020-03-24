/*
Inspiratie van deze code: https://github.com/decrek/progressive-web-apps-1920/blob/master/examples/movies-example/src/service-worker.js
Aan de hand van de presentatie van Declan heb ik zijn code overgenomen en deze lijn voor lijn uit elkaar gehaald
om te kijken hoe dit precies werkte.

De code werkte natuurlijk niet meteen. Door dit dus stuk voor stuk uit elkaar te halen, uit te zoeken wat het deed 
en het vervolgens om te schrijven om het zelf te kunnen gebruiken heb ik er wel veel van geleerd.
*/

const CORE_CACHE_VERSION = 'v1'
const CORE_ASSETS = [
    '/',
    '/movies',
    '/series',
    '/offline',
    'css/index.css'
]

// Open de cache en stop alle CORE_ASSETS erin
self.addEventListener('install', event => {
    console.log('Installing Service Worker')

    event.waitUntil(
        caches.open(CORE_CACHE_VERSION)
            .then((cache) => cache.addAll(CORE_ASSETS))
            .then(() => self.skipWaiting())
    )
})

// Synchroniseert de service worker tussen alle clients
self.addEventListener('activate', event => {
    console.log('Activating service worker')

    event.waitUntil(clients.claim())
})

/* 
Kijkt of de request een core request of een html request is. 
Op basis hiervan gaat wordt de html teruggestuurd, als de pagina niet in de cache staat en de gebruiker offline is
wordt er een offline pagina teruggegeven
*/
self.addEventListener('fetch', event => {
    if (isCoreGetRequest(event.request)) {
        console.log('Core get request: ', event.request.url)

        event.respondWith(
            caches.open(CORE_CACHE_VERSION)
                .then(cache => cache.match(event.request.url))
        )
    } else if (isHtmlGetRequest(event.request)) {
        console.log('html get request', event.request.url)

        event.respondWith(
            caches.open('html-cache')
                .then(cache => cache.match(event.request.url))
                .then(response => response ? response : fetchAndCache(event.request, 'html-cache'))
                .catch(error => {
                    return caches.open(CORE_CACHE_VERSION)
                        .then(cache => cache.match('/offline'))
                })
        )
    }
})

// Als het bestand geen core asset is moet de deze worden gecached wanneer de gebruiker op de pagina komt
function fetchAndCache(request, cacheName) {
    return fetch(request)
        .then(response => {
            if (!response.ok) {
                throw new TypeError('Bad response status');
            }

            const clone = response.clone()
            caches.open(cacheName).then((cache) => cache.put(request, clone))
            return response
        })
}

// Check functions
function isHtmlGetRequest(request) {
    return request.method === 'GET' && (request.headers.get('accept') !== null && request.headers.get('accept').indexOf('text/html') > -1);
}

function isCoreGetRequest(request) {
    return request.method === 'GET' && CORE_ASSETS.includes(getPathName(request.url));
}

function getPathName(requestUrl) {
    const url = new URL(requestUrl);
    return url.pathname;
}