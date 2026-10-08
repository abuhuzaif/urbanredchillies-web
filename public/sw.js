/* Urban Red Chillies — minimal service worker.
 *
 * It exists only so browsers treat the menu as an installable app.
 * It deliberately does NOT cache anything: menu items, prices and offers
 * must always come fresh from the network so customers never see old rates.
 */

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Only handle page navigations; everything else goes straight to network.
  if (event.request.mode !== "navigate") return;

  event.respondWith(
    fetch(event.request).catch(
      () =>
        new Response(
          "<!doctype html><meta name='viewport' content='width=device-width,initial-scale=1'>" +
            "<body style='margin:0;display:flex;min-height:100vh;align-items:center;justify-content:center;" +
            "background:#000;color:#f4e4c1;font-family:sans-serif;text-align:center;padding:24px'>" +
            "<div><h2 style='color:#f0b429'>You're offline</h2>" +
            "<p>Please check your internet connection and try again.</p>" +
            "<p dir='rtl'>يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.</p></div></body>",
          { headers: { "Content-Type": "text/html; charset=utf-8" } }
        )
    )
  );
});
