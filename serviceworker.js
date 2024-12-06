
const CACHE_NAME = "V2_cache_PORTAFOLIO_JJRM";

urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/script.js',
    '/serviceworker.js',
    '/CVJOSEDEJESUSRODRIGUEZMUÑOZ.pdf',
    '/img/letra-j.png',


    //icons  
    '/img/icon_16.png',
    '/img/icon_32.png',
    '/img/icon_64.png',
    '/img/icon_96.png',
    '/img/icon_128.png',
    '/img/icon_192.png',
    '/img/icon_256.png',
    '/img/icon_384.png',
    '/img/icon_512.png',
    '/img/icon_1024.png',

    
     // Imágenes del contenido
    '/img/2.png',
    '/img/Bootstrap.png',
    '/img/casa.png',
    '/img/css.png',
    '/img/fig.png',
    '/img/file.png',
    '/img/flut.png',
    '/img/flutter.png',
    '/img/git.png',
    '/img/gori.png',
    '/img/gym.png',
    '/img/hub.png',
    '/img/js.png',
    '/img/letra-j.png',
    '/img/logo.jpg',
    '/img/react.png',
    '/img/rocket.png',
    '/img/xam.png',
     
   
   //rescursos externos
    '/portafolio.css',
    '/bootstrap.css',
    '/bootstrap.js',
    '/portafolio.js',
];

//Funcion de instalacion
//almacena el nombre y los archivos que van a ir guardados en cache

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return Promise.all(
                urlsToCache.map(url => {
                    return cache.add(url).catch(error => {
                        console.error('Error al cachear:', url, error);
                    });
                })
            );
        })
        .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e =>{
    const listaBlancaCache = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
        .then(nombresCache => {
            return Promise.all(
                nombresCache.map(nombresCache =>{
                    if(listaBlancaCache.indexOf(nombresCache) === -1){
                        return caches.delete(nombresCache)
                    }
                })
            )
        })
        //activamos la cache actualizada
        .then(()=> self.clients.claim())
    )

})

// consultar el servidor 
self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request)
        .then(res =>{
            if(res)
            {
                return res
            }
            return fetch(e.request)
        })
    )
})