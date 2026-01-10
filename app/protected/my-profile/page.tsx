import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, 
  MapPin, 
  Globe, 
  Star, 
  Music, 
  Users, 
  Heart,
  Mic2,
  CheckCircle,
  Settings,
  BarChart3,
  Search,
  Rss
} from "lucide-react";
import { Header } from "@/components/header";

// Types based on the database schema
interface SocialUser {
  user_id: string;
  username: string | null;
  display_name: string | null;
  email: string | null;
  image_url: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  spotify_id: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

interface ConcertAttended {
  id: string;
  setlist_id: string;
  artist_name: string;
  artist_mbid: string | null;
  venue: string | null;
  city: string | null;
  country: string | null;
  date: string | null;
  date_string: string | null;
  created_at: string;
}

interface Review {
  id: string;
  concert_id: string;
  artist_name: string;
  venue_name: string;
  city_name: string | null;
  date: string;
  rating: number;
  text: string | null;
  sound_quality: number | null;
  crowd_energy: number | null;
  venue_rating: number | null;
  setlist_quality: number | null;
  highlights: string[] | null;
  would_recommend: boolean;
  image_url: string | null;
  created_at: string;
}

interface FavoriteArtist {
  id: string;
  artist_id: string;
  artist_name: string;
  image_url: string | null;
  mbid: string | null;
  slot: number;
}

interface WishlistItem {
  id: string;
  artist_id: string;
  artist_name: string;
  artist_mbid: string | null;
  image_url: string | null;
  created_at: string;
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

export default async function MyProfilePage() {
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch social user profile
  const { data: socialUser } = await supabase
    .from('social_users')
    .select('*')
    .eq('user_id', user.id)
    .single();

  // Fetch concerts attended
  const { data: concerts } = await supabase
    .from('concerts_attended')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false })
    .limit(10);

  // Fetch reviews
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  // Fetch favorite artists
  const { data: favoriteArtists } = await supabase
    .from('favorite_artists')
    .select('*')
    .eq('user_id', user.id)
    .order('slot', { ascending: true });

  // Fetch wishlist
  const { data: wishlist } = await supabase
    .from('wishlist')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10);

  // Fetch follower/following counts
  const { count: followersCount } = await supabase
    .from('follows')
    .select('*', { count: 'exact', head: true })
    .eq('following_id', user.id);

  const { count: followingCount } = await supabase
    .from('follows')
    .select('*', { count: 'exact', head: true })
    .eq('follower_id', user.id);

  // Get total concerts count
  const { count: totalConcerts } = await supabase
    .from('concerts_attended')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  // Get total reviews count
  const { count: totalReviews } = await supabase
    .from('reviews')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  // Use user metadata for display if social_users doesn't have the data
  const displayName = socialUser?.display_name || user.user_metadata?.full_name || user.user_metadata?.name || 'User';
  const username = socialUser?.username || user.email?.split('@')[0] || 'user';
  const avatarUrl = socialUser?.image_url || user.user_metadata?.avatar_url;
  const bio = socialUser?.bio;
  const location = socialUser?.location;
  const website = socialUser?.website;
  const isVerified = socialUser?.is_verified || false;
  const memberSince = socialUser?.created_at || user.created_at;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-8 pt-20 max-w-4xl mx-auto">
        {/* Quick Nav */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Link
            href="/protected/feed"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border/40 text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            <Rss className="h-4 w-4 text-primary" />
            Feed
          </Link>
          <Link
            href="/protected/stats"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border/40 text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            <BarChart3 className="h-4 w-4 text-primary" />
            Statistics
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border/40 text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            <Search className="h-4 w-4 text-primary" />
            Search Artists
          </Link>
        </div>

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
              <p className="text-muted-foreground mb-3">@{username}</p>
              
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

            {/* Settings Button */}
            <Link 
              href="/protected/settings"
              className="p-2 rounded-md hover:bg-accent transition-colors"
            >
              <Settings className="h-5 w-5 text-muted-foreground" />
            </Link>
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
              {favoriteArtists.map((artist: FavoriteArtist) => (
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
            {totalConcerts && totalConcerts > 10 && (
              <span className="text-sm font-normal text-muted-foreground">
                (showing 10 of {totalConcerts})
              </span>
            )}
          </h2>
          
          {concerts && concerts.length > 0 ? (
            <div className="space-y-3">
              {concerts.map((concert: ConcertAttended) => (
                <div 
                  key={concert.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background transition-colors"
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
              No concerts logged yet. Start tracking your concert history!
            </p>
          )}
        </section>

        {/* Recent Reviews */}
        <section className="bg-card rounded-xl border border-border/40 p-6 mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Recent Reviews
            {totalReviews && totalReviews > 5 && (
              <span className="text-sm font-normal text-muted-foreground">
                (showing 5 of {totalReviews})
              </span>
            )}
          </h2>
          
          {reviews && reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review: Review) => (
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
              No reviews written yet. Share your concert experiences!
            </p>
          )}
        </section>

        {/* Wishlist */}
        {wishlist && wishlist.length > 0 && (
          <section className="bg-card rounded-xl border border-border/40 p-6 mb-6">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Artists I Want to See
            </h2>
            <div className="flex flex-wrap gap-2">
              {wishlist.map((item: WishlistItem) => (
                <span 
                  key={item.id}
                  className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {item.artist_name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Debug: Raw User Data */}
        <details className="bg-card rounded-xl border border-border/40 p-6">
          <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
            View Raw User Data (Debug)
          </summary>
          <pre className="mt-4 text-xs font-mono p-4 rounded-lg bg-background overflow-auto max-h-96">
            {JSON.stringify({
              auth_user: user,
              social_user: socialUser,
              stats: {
                totalConcerts,
                totalReviews,
                followersCount,
                followingCount
              }
            }, null, 2)}
          </pre>
        </details>
      </main>
    </div>
  );
}
