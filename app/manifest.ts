import type { MetadataRoute } from "next";

// Served automatically at /manifest.webmanifest and linked into every page.
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/menu",
    name: "Urban Red Chillies — Digital Menu",
    short_name: "Red Chillies",
    description:
      "Browse the Urban Red Chillies menu and order straight from your phone.",
    start_url: "/menu",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#000000",
    theme_color: "#000000",
    lang: "en",
    categories: ["food", "restaurant"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
