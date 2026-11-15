self.addEventListener("install", event => {
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});
// Background push notifications are delivered here after a push server
// subscribes the visitor and sends a Web Push message.
self.addEventListener("push", event => {
  let data = { title: "GOD'S GRACE", body: "నేటి దేవుని వాక్యం", url: "./" };
  try { if (event.data) data = { ...data, ...event.data.json() }; } catch (_) {}
  event.waitUntil(self.registration.showNotification(data.title, {
    body: data.body,
    icon: "./images/icon-192.png",
    data: { url: data.url }
  }));
});
self.addEventListener("notificationclick", event => {
  event.notification.close();
  const url = event.notification.data && event.notification.data.url || "./";
  event.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    for (const client of list) if ("focus" in client) { client.navigate(url); return client.focus(); }
    return clients.openWindow(url);
  }));
});
