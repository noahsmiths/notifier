self.skipWaiting();

self.addEventListener('notificationclick', (event) => {
    // console.log(event.notification.data);
    self.clients.openWindow(event.notification.data);
    self.clients.openWindow(`/api/redirect?url=${encodeURIComponent(event.notification.data)}`);
});

self.registration.showNotification("Hello, world!", {
    data: "https://google.com/"
});