const CACHE_NAME = "v1_cache_contador_app_vue";
const urlsToCache = [
    "./",
    "./img/favicon.png",
    "./img/icon32.png",
    "./img/icon64.png",
    "./img/icon128.png",
    "./img/icon256.png",
    "./img/icon512.png",
    "./img/icon1024.png",
    "./js/main.js",
    "https://unpkg.com/vue@next",
    "./js/mountApp.js",
    "./css/normalize.css",
    "./css/style.css",
];

self.addEventListener("install", e =>{
    e.waitUntil(
        caches.open(CACHE_NAME).then(
            cache => cache.addAll(urlsToCache).then(
                () => self.skipWaiting()
            ).catch(
                err => console.log(err)
            )
        )
    )
})

self.addEventListener("activate", e=> {
    const cacheWhiteList = [CACHE_NAME]
    e.waitUntil(
        caches.keys().then(
            cacheNames =>{
                return Promise.all(
                    cacheNames.map(
                        cacheName => {
                            if(cacheWhiteList.indexOf(cacheName) == -1){
                                return caches.delete(cacheName)
                            }
                        }
                    )
                );
            }
        ).then(
            () => self.clients.claim()
        )
    );
});

self.addEventListener("fetch", e=>{
    e.respondWith(
        caches.match(e.request).then(
            res =>{
                if(res){
                    return res;
                }
                return fetch(e.request);
            }
        )
    );
});

