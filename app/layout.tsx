import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Link from 'next/link';
import Image from 'next/image';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SoundCheckd - Concert Tracking & Reviews",
  description: "Track concerts, share reviews, and connect with music lovers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
          <footer className="mt-auto w-full border-t border-gray-200 dark:border-gray-700 py-6 bg-background">
            <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <Image
                  src="/images/soundcheckd-logo-light.jpg"
                  alt="Soundcheckd Logo"
                  width={30}
                  height={30}
                  className="h-auto"
                />
                <Image
                  src="/images/spotify-logo.png"
                  alt="Spotify Logo"
                  width={80}
                  height={24}
                  className="h-auto"
                />
              </div>
              <div className="flex space-x-4">
                <Link href="/support" className="hover:underline">Support</Link>
                <Link href="/terms" className="hover:underline">Terms</Link>
                <Link href="/privacy" className="hover:underline">Privacy</Link>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
