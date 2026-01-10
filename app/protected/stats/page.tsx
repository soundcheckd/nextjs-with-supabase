import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  Calendar,
  MapPin,
  Music,
  Star,
  TrendingUp,
  Award,
  BarChart3,
  ArrowLeft
} from "lucide-react";
import { Header } from "@/components/header";

interface ConcertsByYear {
  [year: string]: number;
}

interface ArtistStats {
  name: string;
  count: number;
}

interface VenueStats {
  name: string;
  city: string;
  count: number;
}

interface CityStats {
  name: string;
  count: number;
}

export default async function StatsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Get total concerts
  const { data: concerts } = await supabase
    .from('concerts_attended')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false });

  // Get reviews
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('user_id', user.id);

  // Calculate statistics
  const totalConcerts = concerts?.length || 0;
  const totalReviews = reviews?.length || 0;

  // Concerts by year
  const concertsByYear: ConcertsByYear = {};
  concerts?.forEach((concert) => {
    const date = concert.date || concert.date_string;
    if (date) {
      // Handle different date formats
      let year: string;
      if (typeof date === 'string' && date.includes('-')) {
        // Try to parse as ISO date or DD-MM-YYYY
        const parts = date.split('-');
        if (parts[0].length === 4) {
          year = parts[0]; // YYYY-MM-DD
        } else {
          year = parts[2]; // DD-MM-YYYY
        }
      } else {
        year = new Date(date).getFullYear().toString();
      }
      
      if (year && !isNaN(parseInt(year))) {
        concertsByYear[year] = (concertsByYear[year] || 0) + 1;
      }
    }
  });

  // Top artists
  const artistCounts: { [name: string]: number } = {};
  concerts?.forEach((concert) => {
    if (concert.artist_name) {
      artistCounts[concert.artist_name] = (artistCounts[concert.artist_name] || 0) + 1;
    }
  });
  const topArtists: ArtistStats[] = Object.entries(artistCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Top venues
  const venueCounts: { [key: string]: { name: string; city: string; count: number } } = {};
  concerts?.forEach((concert) => {
    if (concert.venue) {
      const key = `${concert.venue}-${concert.city}`;
      if (!venueCounts[key]) {
        venueCounts[key] = { name: concert.venue, city: concert.city || '', count: 0 };
      }
      venueCounts[key].count++;
    }
  });
  const topVenues: VenueStats[] = Object.values(venueCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Top cities
  const cityCounts: { [name: string]: number } = {};
  concerts?.forEach((concert) => {
    if (concert.city) {
      cityCounts[concert.city] = (cityCounts[concert.city] || 0) + 1;
    }
  });
  const topCities: CityStats[] = Object.entries(cityCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Average rating
  const ratings = reviews?.map(r => r.rating).filter(r => r != null) || [];
  const avgRating = ratings.length > 0 
    ? ratings.reduce((a, b) => a + b, 0) / ratings.length 
    : 0;

  // Highest rated concerts
  const highestRated = reviews
    ?.filter(r => r.rating >= 4.5)
    .slice(0, 5) || [];

  // Get unique artists count
  const uniqueArtists = new Set(concerts?.map(c => c.artist_name)).size;

  // Get unique venues count
  const uniqueVenues = new Set(concerts?.map(c => c.venue)).size;

  // Calculate current year stats
  const currentYear = new Date().getFullYear().toString();
  const currentYearConcerts = concertsByYear[currentYear] || 0;

  // Sort years for display
  const sortedYears = Object.keys(concertsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-8 pt-20 max-w-4xl mx-auto">
        {/* Back Link */}
        <Link 
          href="/protected/my-profile"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to profile
        </Link>

        <h1 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          Your Concert Statistics
        </h1>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl border border-border/40 p-4 text-center">
            <Music className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-3xl font-bold text-foreground">{totalConcerts}</p>
            <p className="text-sm text-muted-foreground">Concerts Attended</p>
          </div>
          <div className="bg-card rounded-xl border border-border/40 p-4 text-center">
            <Star className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-3xl font-bold text-foreground">{totalReviews}</p>
            <p className="text-sm text-muted-foreground">Reviews Written</p>
          </div>
          <div className="bg-card rounded-xl border border-border/40 p-4 text-center">
            <Award className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-3xl font-bold text-foreground">{uniqueArtists}</p>
            <p className="text-sm text-muted-foreground">Unique Artists</p>
          </div>
          <div className="bg-card rounded-xl border border-border/40 p-4 text-center">
            <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-3xl font-bold text-foreground">{uniqueVenues}</p>
            <p className="text-sm text-muted-foreground">Venues Visited</p>
          </div>
        </div>

        {/* Year in Review */}
        <section className="bg-card rounded-xl border border-border/40 p-6 mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            {currentYear} So Far
          </h2>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <p className="text-6xl font-bold text-primary">{currentYearConcerts}</p>
              <p className="text-muted-foreground mt-2">concerts this year</p>
            </div>
          </div>
        </section>

        {/* Concerts by Year */}
        {sortedYears.length > 0 && (
          <section className="bg-card rounded-xl border border-border/40 p-6 mb-6">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Concerts by Year
            </h2>
            <div className="space-y-3">
              {sortedYears.map((year) => {
                const count = concertsByYear[year];
                const maxCount = Math.max(...Object.values(concertsByYear));
                const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
                
                return (
                  <div key={year} className="flex items-center gap-4">
                    <span className="w-12 text-sm font-medium text-foreground">{year}</span>
                    <div className="flex-1 h-8 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${Math.max(percentage, 10)}%` }}
                      >
                        <span className="text-xs font-bold text-primary-foreground">
                          {count}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Top Artists */}
          {topArtists.length > 0 && (
            <section className="bg-card rounded-xl border border-border/40 p-6">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Most Seen Artists
              </h2>
              <div className="space-y-3">
                {topArtists.map((artist, index) => (
                  <div key={artist.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-yellow-500 text-yellow-950' :
                        index === 1 ? 'bg-gray-300 text-gray-700' :
                        index === 2 ? 'bg-amber-600 text-amber-100' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="font-medium text-foreground">{artist.name}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      {artist.count} {artist.count === 1 ? 'show' : 'shows'}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Top Venues */}
          {topVenues.length > 0 && (
            <section className="bg-card rounded-xl border border-border/40 p-6">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Favorite Venues
              </h2>
              <div className="space-y-3">
                {topVenues.map((venue, index) => (
                  <div key={`${venue.name}-${venue.city}`} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-yellow-500 text-yellow-950' :
                        index === 1 ? 'bg-gray-300 text-gray-700' :
                        index === 2 ? 'bg-amber-600 text-amber-100' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">{venue.name}</p>
                        {venue.city && (
                          <p className="text-xs text-muted-foreground truncate">{venue.city}</p>
                        )}
                      </div>
                    </div>
                    <span className="text-muted-foreground text-sm flex-shrink-0 ml-2">
                      {venue.count} {venue.count === 1 ? 'show' : 'shows'}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Cities */}
        {topCities.length > 0 && (
          <section className="bg-card rounded-xl border border-border/40 p-6 mt-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Cities You've Seen Live Music</h2>
            <div className="flex flex-wrap gap-2">
              {topCities.map((city) => (
                <span 
                  key={city.name}
                  className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {city.name} ({city.count})
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Average Rating */}
        {avgRating > 0 && (
          <section className="bg-card rounded-xl border border-border/40 p-6 mt-6">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Your Rating Stats
            </h2>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-foreground">{avgRating.toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${
                      i < Math.floor(avgRating) 
                        ? 'fill-primary text-primary' 
                        : i < avgRating 
                          ? 'fill-primary/50 text-primary' 
                          : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Empty State */}
        {totalConcerts === 0 && (
          <div className="bg-card rounded-xl border border-border/40 p-8 text-center">
            <Music className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <h2 className="text-lg font-semibold text-foreground mb-2">
              No concerts yet
            </h2>
            <p className="text-muted-foreground mb-4">
              Start logging your concerts to see your statistics here!
            </p>
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Search for Concerts
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
