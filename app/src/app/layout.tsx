import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../components/Auth/AuthProvider/AuthProvider";
import { NotificationProvider } from "../components/ui/Notification/Notification";
import Header from "../components/ui/Header/Header";
import Footer from "../components/ui/Footer/Footer";
import Sidebar from "../components/ui/Sidebar/Sidebar";
import AcceptCookies from "../components/AcceptCookies/AcceptCookies";
import LayoutWrapper from "../components/ui/LayoutWrapper/LayoutWrapper";
// import ServiceWorkerRegister from "../components/ServiceWorkerRegister/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "Shivaay",
  description:
    "Shivaay is a multilingual, context-aware AI chatbot designed to address the unique challenges faced by tourists in Uttarakhand. Our mission is to bridge the information gap by providing a seamless, interactive guide that connects travelers with the region's rich cultural heritage, spiritual significance, and natural beauty. Shivaay serves as a personal travel assistant, a cultural expert, and a wellness guide, all in one.",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
    shortcut: "/icon.svg",
  },
  openGraph: {
    title: "Shivaay",
    description:
      "Shivaay is a multilingual, context-aware AI chatbot designed to address the unique challenges faced by tourists in Uttarakhand. Our mission is to bridge the information gap by providing a seamless, interactive guide that connects travelers with the region's rich cultural heritage, spiritual significance, and natural beauty. Shivaay serves as a personal travel assistant, a cultural expert, and a wellness guide, all in one.",
    url: "https://shivaay.upayan.dev",
    siteName: "Shivaay",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shivaay Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivaay",
    description:
      "Ever wanted to form a music band but found it too hard to find fellow band members? Shivaay is here to help!",
    images: ["/og-image.png"],
  },
  manifest: "/manifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  appleWebApp: {
    capable: true,
    title: "Shivaay",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  metadataBase: new URL("https://shivaay.upayan.dev"),
  alternates: {
    canonical: "https://Shivaay.upayan.dev",
    types: {
      "application/rss+xml": "/feed.xml",
      "application/atom+xml": "/feed.atom",
    },
    languages: {
      "en-US": "/",
      "en-GB": "/gb",
      "fr-FR": "/fr",
      "es-ES": "/es",
      "de-DE": "/de",
    },
  },
  keywords: [
    "Shivaay",
    "music",
    "band",
    "find band members",
    "musicians",
    "collaboration",
    "music community",
    "join band",
    "musical collaboration",
  ],
  authors: [
    {
      name: "Raisa Jose",
      url: "https://github.com/raisaaajose",
    },
    {
      name: "Upayan Mazumder",
      url: "https://upayan.dev",
    },
    {
      name: "Aditya Rohilla",
      url: "https://github.com/Rohilalala",
    },
    {
      name: "Maneet Gupta",
      url: "https://www.linkedin.com/in/maneet-gupta/",
    },
  ],
  applicationName: "Shivaay",
  category: "Entertainment",
  themeColor: "#361d56",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.webp"
        />
      </head>
      <body>
        <NotificationProvider>
          <AuthProvider>
            <Sidebar />
            <LayoutWrapper>
              <Header />
              {children}
              <Footer />
              {/* <ServiceWorkerRegister /> */}
            </LayoutWrapper>
            <AcceptCookies />
          </AuthProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
