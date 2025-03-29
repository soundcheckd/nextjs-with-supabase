import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">SoundCheckd</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/concerts" className="transition-colors hover:text-foreground/80">
                Concerts
              </Link>
              <Link href="/reviews" className="transition-colors hover:text-foreground/80">
                Reviews
              </Link>
              <Link href="/artists" className="transition-colors hover:text-foreground/80">
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
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Track Concerts, Share Reviews,{" "}
              <span className="text-primary">Connect with Music Lovers</span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              SoundCheckd is your go-to platform for concert tracking, reviews, and connecting with fellow music enthusiasts.
            </p>
            <div className="space-x-4">
              <Link href="/concerts">
                <Button size="lg">Browse Concerts</Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg">Get Started</Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
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
                <h3 className="font-bold">Track Concerts</h3>
                <p className="text-sm text-muted-foreground">
                  Keep track of concerts you've attended and want to attend
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <h3 className="font-bold">Write Reviews</h3>
                <p className="text-sm text-muted-foreground">
                  Share your concert experiences with the community
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <h3 className="font-bold">Rate Shows</h3>
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
                className="font-medium underline underline-offset-4"
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
