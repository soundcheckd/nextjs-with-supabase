import Link from "next/link";
import { Apple, Mic2, Star, ListMusic, Users, Calendar, Heart } from "lucide-react";
import Image from 'next/image';
import { FeaturedArtists } from '@/components/featured-artists';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header with Auth State */}
      <Header />

      <main className="flex-1 pt-14">
        {/* Hero Section with Backdrop */}
        <section className="relative flex items-center justify-center overflow-hidden">
          {/* Backdrop gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/5 to-background" />
          
          {/* Content */}
          <div className="relative z-10 container px-4 py-16 text-center">
            {/* Logo above headline */}
            <div className="mb-8">
              <Image
                src="/images/soundcheckd-logo-outline-transparent.png"
                alt="Soundcheckd"
                width={120}
                height={120}
                className="mx-auto"
                priority
              />
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-tight max-w-4xl mx-auto">
              Track concerts you've attended.<br />
              Save those you want to see.<br />
              Tell your friends what's good.
            </h1>
            
            <Link
              href="/sign-up"
              className="mt-10 inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Get started — it's free!
            </Link>
            
            <p className="mt-8 text-muted-foreground">
              <strong className="text-foreground">The social network for concert lovers.</strong>
              <br />
              <span className="inline-flex items-center gap-2 mt-2">
                Coming soon on 
                <Apple className="h-4 w-4" />
                iOS
              </span>
            </p>

            {/* App Preview - Directly under tagline */}
            <div className="mt-12 max-w-xs mx-auto">
              <div className="bg-card rounded-2xl p-6 shadow-xl border border-border/40">
                <div className="w-40 h-auto mx-auto rounded-2xl overflow-hidden border-4 border-border/60 shadow-2xl">
                  <Image
                    src="/images/web_app_preview.jpg"
                    alt="SoundCheckd App Preview"
                    width={160}
                    height={347}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="mt-6">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
                  >
                    <Apple className="h-4 w-4" />
                    Coming Soon to App Store
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Artists Section */}
        <section className="py-12 border-t border-border/40">
          <div className="container px-4">
            <FeaturedArtists />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 border-t border-border/40">
          <div className="container px-4">
            <h2 className="text-center text-muted-foreground text-lg mb-10">
              soundcheckd lets you…
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="feature-panel group">
                <Calendar className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-foreground">
                  Keep track of every concert you've ever attended (or just start from the day you join)
                </p>
              </div>
              
              <div className="feature-panel group">
                <Heart className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-foreground">
                  Show some love for your favorite shows, lists and reviews with a "like"
                </p>
              </div>
              
              <div className="feature-panel group">
                <Mic2 className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-foreground">
                  Write and share reviews, and follow friends and other members to read theirs
                </p>
              </div>
              
              <div className="feature-panel group">
                <Star className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-foreground">
                  Rate each concert on a five-star scale to record and share your reaction
                </p>
              </div>
              
              <div className="feature-panel group">
                <ListMusic className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-foreground">
                  Keep a diary of your concert-going experience and track your live music journey
                </p>
              </div>
              
              <div className="feature-panel group">
                <Users className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-foreground">
                  Compile and share lists of concerts on any topic and keep a wishlist of shows to see
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-t border-border/40 bg-card/50">
          <div className="container px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Write and share reviews. Compile your own lists. Share your life in live music.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join the community of music lovers tracking their concert experiences. 
              <Link href="/sign-up" className="text-primary hover:underline ml-1">
                Sign up
              </Link>
              {" "}to create your own.
            </p>
          </div>
        </section>
      </main>

    </div>
  );
}
