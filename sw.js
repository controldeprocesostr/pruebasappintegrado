// --- 1. IMPORTAR LIBRERÍAS DE FIREBASE MESSAGING ---
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// --- 2. CONFIGURAR FIREBASE ---
firebase.initializeApp({
  apiKey: "AIzaSyAB4UlwaVJzc4U4VbmddLf4mejKAOvTufw",
  authDomain: "hornosapp-60887.firebaseapp.com",
  projectId: "hornosapp-60887",
  messagingSenderId: "853377072466",
  appId: "1:853377072466:web:4ef4a4b25593271603ce8b",
});

// --- 3. INICIAR MESSAGING ---
const messaging = firebase.messaging();

// --- 4. MANEJAR NOTIFICACIONES EN SEGUNDO PLANO ---
messaging.onBackgroundMessage((payload) => {
  console.log('Notificación recibida en segundo plano:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// --- 5. LO QUE YA TENÍAS (CACHÉ) ---
const CACHE_NAME = 'hornos-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Instalación
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activación
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Interceptar solicitudes
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
