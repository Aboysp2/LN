const CACHE_NAME = "labarkouh-v3";
const ASSETS = ["./", "./index.html", "./script.js", "./manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return (
          cached ||
          fetch(event.request).then((res) => {
            if (res.ok && event.request.method === "GET") {
              const clone = res.clone();
              caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
            }
            return res;
          }).catch(() => cached)
        );
      })
    );
  }
});

/* ---------- Push & Notifications ---------- */
self.addEventListener("push", (event) => {
  let data = { title: "Labarkouh News", body: "خبر عاجل جديد", url: "/" };
  try {
    if (event.data) {
      const json = event.data.json();
      data = { ...data, ...json };
    }
  } catch (_) {
    if (event.data) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body || "",
    icon: data.icon || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23dc2626' width='100' height='100' rx='22'/%3E%3Ctext x='50' y='68' font-size='52' text-anchor='middle' fill='white' font-family='system-ui' font-weight='800'%3EL%3C/text%3E%3C/svg%3E",
    badge: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23dc2626' width='100' height='100' rx='22'/%3E%3Ctext x='50' y='68' font-size='52' text-anchor='middle' fill='white' font-family='system-ui' font-weight='800'%3EL%3C/text%3E%3C/svg%3E",
    tag: "labarkouh-breaking",
    renotify: true,
    data: { url: data.url || "/" },
    actions: [
      { action: "open", title: "فتح" },
      { action: "close", title: "إغلاق" }
    ]
  };

  event.waitUntil(self.registration.showNotification(data.title || "Labarkouh News", options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "close") return;

  const targetUrl = (event.notification.data && event.notification.data.url) || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          client.focus();
          if (targetUrl && targetUrl !== "/" && "navigate" in client) {
            try { client.navigate(targetUrl); } catch (_) {}
          }
          return;
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl.startsWith("http") ? targetUrl : self.location.origin + "/");
      }
    })
  );
});

self.addEventListener("notificationclose", () => {});
