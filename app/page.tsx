import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Apple } from "lucide-react";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/soundcheckd-logo-light.jpg"
              alt="Soundcheckd Logo"
              width={40}
              height={40}
              className="rounded-md"
            />
            <span className="font-bold text-2xl bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              soundcheckd
            </span>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-blue-500/20 to-primary/20" />
          <div className="container relative py-24 md:py-32">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                  Your Concert Journey,{" "}
                  <span className="text-primary">Elevated</span>
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                  Track concerts, share reviews, and connect with fellow music lovers.
                  Download the soundcheckd app to take your concert experience to the next level.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-white hover:bg-black/90"
                  >
                    <Apple className="mr-2 h-5 w-5" />
                    Coming Soon to App Store
                  </a>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/20 p-8">
                  <div className="h-full w-full rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl">📱</span>
                      <p className="mt-4 text-muted-foreground">App Preview Coming Soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container py-24 md:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
              Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Everything you need to track and review concerts
            </p>
          </div>
          <div className="mx-auto mt-16 grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <h3 className="font-bold text-primary">Track Concerts</h3>
                <p className="text-sm text-muted-foreground">
                  Keep track of concerts you've attended and want to attend
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <h3 className="font-bold text-primary">Write Reviews</h3>
                <p className="text-sm text-muted-foreground">
                  Share your concert experiences with the community
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <h3 className="font-bold text-primary">Rate Shows</h3>
                <p className="text-sm text-muted-foreground">
                  Rate concerts and help others discover great shows
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2025 soundcheckd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
