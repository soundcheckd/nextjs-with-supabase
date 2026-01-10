import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Link from 'next/link';
import Image from 'next/image';

const inter = Inter({ subsets: ["latin"] });

const siteConfig = {
  name: "soundcheckd",
  url: "https://soundcheckd.co",
  description: "Track concerts you've attended, save those you want to see, and tell your friends what's good. The social network for concert lovers.",
  keywords: [
    "concert tracking",
    "live music",
    "concert reviews",
    "music social network",
    "setlist",
    "concert diary",
    "music discovery",
    "concert recommendations",
    "live shows",
    "music events"
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Track concerts. Share reviews. Connect with music lovers.`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "soundcheckd" }],
  creator: "soundcheckd",
  publisher: "soundcheckd",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "soundcheckd - The social network for concert lovers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/twitter-image.png"],
    creator: "@soundcheckd",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: siteConfig.url,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f6fc" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1625" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": siteConfig.name,
              "description": siteConfig.description,
              "url": siteConfig.url,
              "applicationCategory": "SocialNetworkingApplication",
              "operatingSystem": "Web, iOS",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
              },
              "author": {
                "@type": "Organization",
                "name": siteConfig.name,
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-grow">
            {children}
          </main>
          <Toaster />
          <footer className="mt-auto w-full border-t border-border/40 py-6 bg-card/30">
            <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
              <div className="flex items-center space-x-3">
                <Image
                  src="/images/soundcheckd-logo-outline-transparent.png"
                  alt="Soundcheckd Logo"
                  width={24}
                  height={24}
                  className="rounded"
                />
                <span className="text-muted-foreground">© 2025 soundcheckd. All rights reserved.</span>
              </div>
              <nav className="flex space-x-6">
                <Link href="/support" className="hover:text-foreground transition-colors">Support</Link>
                <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
                <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              </nav>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
