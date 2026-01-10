import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, 
  MapPin, 
  Globe, 
  Star, 
  Music, 
  Heart,
  Mic2,
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import { Header } from "@/components/header";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ username: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const supabase = await createClient();
  
  const { data: user } = await supabase
    .from('social_users')
    .select('display_name, username, bio')
    .eq('username', username)
    .single();

  if (!user) {
    return {
      title: 'User Not Found | soundcheckd',
    };
  }

  const displayName = user.display_name || `@${user.username}`;
  
  return {
    title: `${displayName} | soundcheckd`,
    description: user.bio || `Check out ${displayName}'s concert history on soundcheckd`,
    openGraph: {
      title: `${displayName} on soundcheckd`,
      description: user.bio || `Check out ${displayName}'s concert history on soundcheckd`,
    },
  };
}

function formatDate(dateString: string | null): string {
  if (!dateString) return 'Unknown date';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < fullStars 
              ? 'fill-primary text-primary' 
              : i === fullStars && hasHalf 
                ? 'fill-primary/50 text-primary' 
                : 'text-muted-foreground/30'
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params;
  const supabase = await createClient();

  // Get the profile by username
  const { data: socialUser, error } = await supabase
    .from('social_users')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !socialUser) {
    notFound();
  }

  const userId = socialUser.user_id;

  // Fetch concerts attended
  const { data: concerts } = await supabase
    .from('concerts_attended')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(10);

  // Fetch reviews
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(5);

  // Fetch favorite artists
  const { data: favoriteArtists } = await supabase
    .from('favorite_artists')
    .select('*')
    .eq('user_id', userId)
    .order('slot', { ascending: true });

  // Fetch follower/following counts
  const { count: followersCount } = await supabase
    .from('follows')
    .select('*', { count: 'exact', head: true })
    .eq('following_id', userId);

  const { count: followingCount } = await supabase
    .from('follows')
    .select('*', { count: 'exact', head: true })
    .eq('follower_id', userId);

  // Get total concerts count
  const { count: totalConcerts } = await supabase
    .from('concerts_attended')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  // Get total reviews count
  const { count: totalReviews } = await supabase
    .from('reviews')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  const displayName = socialUser.display_name || `@${socialUser.username}`;
  const avatarUrl = socialUser.image_url;
  const bio = socialUser.bio;
  const location = socialUser.location;
  const website = socialUser.website;
  const isVerified = socialUser.is_verified || false;
  const memberSince = socialUser.created_at;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-8 pt-20 max-w-4xl mx-auto">
        {/* Back Link */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        {/* Profile Header */}
        <div className="bg-card rounded-xl border border-border/40 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="relative">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={displayName}
                  width={120}
                  height={120}
                  className="rounded-full object-cover border-4 border-primary/20"
                  unoptimized
                />
              ) : (
                <div className="w-[120px] h-[120px] rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              {isVerified && (
                <CheckCircle className="absolute bottom-1 right-1 h-6 w-6 text-primary fill-background" />
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-foreground">{displayName}</h1>
                {isVerified && (
                  <CheckCircle className="h-5 w-5 text-primary" />
                )}
              </div>
              <p className="text-muted-foreground mb-3">@{socialUser.username}</p>
              
              {bio && (
                <p className="text-foreground mb-3">{bio}</p>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {location}
                  </span>
                )}
                {website && (
                  <a 
                    href={website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    <Globe className="h-4 w-4" />
                    Website
                  </a>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined {formatDate(memberSince)}
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-border/40">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{totalConcerts || 0}</p>
              <p className="text-sm text-muted-foreground">Concerts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{totalReviews || 0}</p>
              <p className="text-sm text-muted-foreground">Reviews</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{followersCount || 0}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{followingCount || 0}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>
        </div>

        {/* Favorite Artists */}
        {favoriteArtists && favoriteArtists.length > 0 && (
          <section className="bg-card rounded-xl border border-border/40 p-6 mb-6">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Favorite Artists
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {favoriteArtists.map((artist) => (
                <div key={artist.id} className="text-center group">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto mb-3 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/40 transition-colors shadow-lg">
                    {artist.image_url ? (
                      <Image
                        src={artist.image_url}
                        alt={artist.artist_name}
                        fill
                        sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 144px"
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                        <Music className="h-10 w-10 sm:h-12 sm:h-12 md:h-14 md:w-14 text-primary" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm sm:text-base font-medium text-foreground truncate px-2">{artist.artist_name}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recent Concerts */}
        <section className="bg-card rounded-xl border border-border/40 p-6 mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Mic2 className="h-5 w-5 text-primary" />
            Recent Concerts
          </h2>
          
          {concerts && concerts.length > 0 ? (
            <div className="space-y-3">
              {concerts.map((concert) => (
                <div 
                  key={concert.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-background/50"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{concert.artist_name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {concert.venue}{concert.city && `, ${concert.city}`}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground ml-4 whitespace-nowrap">
                    {formatDate(concert.date || concert.date_string)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No concerts logged yet.
            </p>
          )}
        </section>

        {/* Recent Reviews */}
        <section className="bg-card rounded-xl border border-border/40 p-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Recent Reviews
          </h2>
          
          {reviews && reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div 
                  key={review.id} 
                  className="p-4 rounded-lg bg-background/50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-foreground">{review.artist_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {review.venue_name}{review.city_name && `, ${review.city_name}`}
                      </p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  {review.text && (
                    <p className="text-sm text-foreground/80 mt-2 line-clamp-3">
                      {review.text}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatDate(review.created_at)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No reviews written yet.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
