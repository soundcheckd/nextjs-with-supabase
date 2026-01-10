import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, 
  Heart, 
  MessageCircle, 
  Calendar,
  MapPin,
  Music,
  ArrowLeft,
  Users
} from "lucide-react";
import { Header } from "@/components/header";

function formatDate(dateString: string | null): string {
  if (!dateString) return 'Unknown date';
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    
    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${Math.floor(diffHours)}h ago`;
    } else if (diffDays < 7) {
      return `${Math.floor(diffDays)}d ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
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
    </div>
  );
}

interface FeedItem {
  id: string;
  type: 'review' | 'concert';
  user: {
    id: string;
    username: string;
    display_name: string | null;
    image_url: string | null;
  };
  artist_name: string;
  venue_name?: string;
  city_name?: string;
  date: string;
  created_at: string;
  rating?: number;
  text?: string;
  likes_count?: number;
  comments_count?: number;
}

export default async function FeedPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Get the list of users the current user follows
  const { data: following } = await supabase
    .from('follows')
    .select('following_id')
    .eq('follower_id', user.id);

  const followingIds = following?.map(f => f.following_id) || [];

  let feedItems: FeedItem[] = [];

  if (followingIds.length > 0) {
    // Fetch reviews from followed users
    const { data: reviews } = await supabase
      .from('reviews')
      .select(`
        id,
        artist_name,
        venue_name,
        city_name,
        date,
        rating,
        text,
        created_at,
        user_id,
        social_users!inner (
          user_id,
          username,
          display_name,
          image_url
        )
      `)
      .in('user_id', followingIds)
      .order('created_at', { ascending: false })
      .limit(20);

    // Fetch concerts from followed users
    const { data: concerts } = await supabase
      .from('concerts_attended')
      .select(`
        id,
        artist_name,
        venue,
        city,
        date,
        created_at,
        user_id,
        social_users!inner (
          user_id,
          username,
          display_name,
          image_url
        )
      `)
      .in('user_id', followingIds)
      .order('created_at', { ascending: false })
      .limit(20);

    // Merge and format feed items
    const reviewItems: FeedItem[] = (reviews || []).map((r: any) => ({
      id: r.id,
      type: 'review' as const,
      user: {
        id: r.social_users.user_id,
        username: r.social_users.username,
        display_name: r.social_users.display_name,
        image_url: r.social_users.image_url,
      },
      artist_name: r.artist_name,
      venue_name: r.venue_name,
      city_name: r.city_name,
      date: r.date,
      created_at: r.created_at,
      rating: r.rating,
      text: r.text,
    }));

    const concertItems: FeedItem[] = (concerts || []).map((c: any) => ({
      id: c.id,
      type: 'concert' as const,
      user: {
        id: c.social_users.user_id,
        username: c.social_users.username,
        display_name: c.social_users.display_name,
        image_url: c.social_users.image_url,
      },
      artist_name: c.artist_name,
      venue_name: c.venue,
      city_name: c.city,
      date: c.date,
      created_at: c.created_at,
    }));

    // Combine and sort by created_at
    feedItems = [...reviewItems, ...concertItems].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ).slice(0, 30);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-8 pt-20 max-w-2xl mx-auto">
        {/* Back Link */}
        <Link 
          href="/protected/my-profile"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to profile
        </Link>

        <h1 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          Your Feed
        </h1>

        {followingIds.length === 0 ? (
          <div className="bg-card rounded-xl border border-border/40 p-8 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Follow people to see their activity
            </h2>
            <p className="text-muted-foreground mb-4">
              When you follow other concert lovers, their reviews and attended concerts will show up here.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Discover Concerts
            </Link>
          </div>
        ) : feedItems.length === 0 ? (
          <div className="bg-card rounded-xl border border-border/40 p-8 text-center">
            <Music className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <h2 className="text-lg font-semibold text-foreground mb-2">
              No recent activity
            </h2>
            <p className="text-muted-foreground">
              The people you follow haven't posted any reviews or logged any concerts recently.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {feedItems.map((item) => (
              <div 
                key={`${item.type}-${item.id}`}
                className="bg-card rounded-xl border border-border/40 p-4"
              >
                {/* User Header */}
                <div className="flex items-center gap-3 mb-3">
                  <Link href={`/user/${item.user.username}`}>
                    {item.user.image_url ? (
                      <Image
                        src={item.user.image_url}
                        alt={item.user.display_name || item.user.username}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {(item.user.display_name || item.user.username).charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link 
                      href={`/user/${item.user.username}`}
                      className="font-medium text-foreground hover:underline"
                    >
                      {item.user.display_name || `@${item.user.username}`}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {item.type === 'review' ? 'reviewed a concert' : 'attended a concert'}
                      {' · '}{formatDate(item.created_at)}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="pl-13">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">
                        {item.artist_name}
                      </h3>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-sm text-muted-foreground">
                        {item.venue_name && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {item.venue_name}
                            {item.city_name && `, ${item.city_name}`}
                          </span>
                        )}
                        {item.date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {item.date}
                          </span>
                        )}
                      </div>
                    </div>
                    {item.rating && (
                      <StarRating rating={item.rating} />
                    )}
                  </div>
                  
                  {item.text && (
                    <p className="mt-2 text-foreground/80 text-sm line-clamp-3">
                      {item.text}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/40">
                    <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Heart className="h-4 w-4" />
                      Like
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
