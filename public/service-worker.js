self.skipWaiting();

self.addEventListener('notificationclick', (event) => {
    // console.log(event.notification.data);
    // self.clients.openWindow(event.notification.data);
    self.clients.openWindow(`/api/redirect?url=${encodeURIComponent(event.notification.data)}`);
});

self.addEventListener('push', (event) => {
    const data = event.data.json();
    self.registration.showNotification("Open site", {
        data: data.url
    });
});