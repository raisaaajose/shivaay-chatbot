import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shivaay",
    short_name: "Shivaay",
    description:
      "Shivaay is a multilingual, context-aware AI chatbot designed to address the unique challenges faced by tourists in Uttarakhand. Our mission is to bridge the information gap by providing a seamless, interactive guide that connects travelers with the region's rich cultural heritage, spiritual significance, and natural beauty. Shivaay serves as a personal travel assistant, a cultural expert, and a wellness guide, all in one.",
    start_url: "/",
    display: "standalone",
    background_color: "#361d56",
    theme_color: "#361d56",
    orientation: "portrait",
    scope: "/",
    icons: [
      {
        src: "/icons/icon-16x16.webp",
        sizes: "16x16",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-32x32.webp",
        sizes: "32x32",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-48x48.webp",
        sizes: "48x48",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-64x64.webp",
        sizes: "64x64",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-72x72.webp",
        sizes: "72x72",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-76x76.webp",
        sizes: "76x76",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-96x96.webp",
        sizes: "96x96",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-114x114.webp",
        sizes: "114x114",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-120x120.webp",
        sizes: "120x120",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-128x128.webp",
        sizes: "128x128",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-144x144.webp",
        sizes: "144x144",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-152x152.webp",
        sizes: "152x152",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-180x180.webp",
        sizes: "180x180",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-192x192.webp",
        sizes: "192x192",
        type: "image/webp",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-196x196.webp",
        sizes: "196x196",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-228x228.webp",
        sizes: "228x228",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-256x256.webp",
        sizes: "256x256",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-384x384.webp",
        sizes: "384x384",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.webp",
        sizes: "512x512",
        type: "image/webp",
        purpose: "maskable",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    lang: "en-US",
    dir: "ltr",
  };
}
