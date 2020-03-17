self.addEventListener('install', event => {

    console.log('installing')
})

self.addEventListener('activate', event => {

    console.log('activate')
})

self.addEventListener('fetch', event => {

    console.log('fetch')
    // event.request.url
    // event.request.headers
})