const CACHE="hpl-youth-v1";
const SHELL=["/","/index.html","/icon-192.png","/icon-512.png","/manifest.webmanifest","/apple-touch-icon.png"];
self.addEventListener("install",function(e){self.skipWaiting();e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(SHELL).catch(function(){});}));});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener("fetch",function(e){
  var req=e.request; if(req.method!=="GET") return;
  var url=new URL(req.url); if(url.origin!==location.origin) return;
  if(req.mode==="navigate"){
    e.respondWith(fetch(req).then(function(r){var cp=r.clone();caches.open(CACHE).then(function(c){c.put("/index.html",cp);});return r;}).catch(function(){return caches.match("/index.html").then(function(r){return r||caches.match("/");});}));
    return;
  }
  e.respondWith(caches.match(req).then(function(r){return r||fetch(req).then(function(res){var cp=res.clone();caches.open(CACHE).then(function(c){c.put(req,cp);});return res;}).catch(function(){return r;});}));
});
