if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js').then( function(){
        console.log('service worker registered successfully')
    }).catch(function(){
        console.log('failed to register')
    })
 }

 self.addEventListener('install', function(event){
    event.waitUntil(caches.open('cach-1').then(function(cache){
        cache.addAll(
          [
            './',
            './index.html',
            './restaurant.html',
            './css/styles.css',
            './js/dbhelper.js',
            './js/main.js',
            './js/restaurant_info.js',
            './data/restaurants.json',
            './img/1.jpg',
            './img/2.jpg',
            './img/3.jpg',
            './img/4.jpg',
            './img/5.jpg',
            './img/6.jpg',
            './img/7.jpg',
            './img/8.jpg',
            './img/9.jpg',
            './img/10.jpg'
        ]
        )
    }))

 })
 var nameOfCache = 'cach-1';
 self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(cacheNames.map(function(cached) {
                if (nameOfCache.indexOf(cached) === -1){
                    return caches.delete(cached);
                }
              }));
            })
        );
});



 self.addEventListener('fetch', function(event){
    event.respondWith(caches.match(event.request).then(function(response){
        if(response){
            return response
        }
        else {
            return fetch(event.request)
        }
    }))
 });