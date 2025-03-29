import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { Apple } from "lucide-react";

export default async function Home() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold text-primary">SoundCheckd</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/concerts" className="transition-colors hover:text-primary">
                Concerts
              </Link>
              <Link href="/reviews" className="transition-colors hover:text-primary">
                Reviews
              </Link>
              <Link href="/artists" className="transition-colors hover:text-primary">
                Artists
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            {session ? (
              <Link href="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20" />
          <div className="container relative py-24 md:py-32">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                  Your Concert Journey,{" "}
                  <span className="text-primary">Elevated</span>
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                  Track concerts, share reviews, and connect with fellow music lovers. Download the SoundCheckd app to take your concert experience to the next level.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="https://apps.apple.com/app/soundcheckd/id123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-white hover:bg-black/90"
                  >
                    <Apple className="mr-2 h-5 w-5" />
                    Download on the App Store
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8">
                  <div className="h-full w-full rounded-xl bg-white/10 backdrop-blur-sm">
                    {/* Placeholder for app screenshot */}
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      App Preview
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container py-24 md:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Everything you need to track and review concerts
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:gap-8">
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
              Built with Next.js and Supabase. The source code is available on{" "}
              <a
                href="https://github.com/yourusername/soundcheckd"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary hover:underline"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
