import { searchArtists as searchSetlistArtists, getArtistSetlists } from "@/lib/setlistfm";
import { getArtistProfile } from "@/lib/discogs";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Calendar,
  MapPin,
  Music,
  ExternalLink,
  ArrowLeft,
  Globe,
  Users
} from "lucide-react";
import { Header } from "@/components/header";
import { ArtistSetlistsClient } from "./setlists-client";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ mbid: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { mbid } = await params;
  
  // Get artist info from Setlist.fm
  const setlistData = await getArtistSetlists(mbid, 1);
  const artistName = setlistData?.setlist?.[0]?.artist?.name || "Artist";
  
  return {
    title: `${artistName} - Concert History | soundcheckd`,
    description: `View ${artistName}'s complete concert history, setlists, and tour dates on soundcheckd.`,
    openGraph: {
      title: `${artistName} on soundcheckd`,
      description: `View ${artistName}'s complete concert history and setlists.`,
    },
  };
}

function formatDate(dateStr: string): string {
  // Setlist.fm uses DD-MM-YYYY format
  const [day, month, year] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Clean and format the Discogs profile text
function formatProfile(profile: string | null): string {
  if (!profile) return "";
  // Remove [a=...], [l=...], [url=...] tags common in Discogs
  return profile
    .replace(/\[a=([^\]]+)\]/g, '$1')
    .replace(/\[l=([^\]]+)\]/g, '$1')
    .replace(/\[url=([^\]]+)\]([^\[]*)\[\/url\]/g, '$2')
    .replace(/\[b\]/g, '')
    .replace(/\[\/b\]/g, '')
    .replace(/\[i\]/g, '')
    .replace(/\[\/i\]/g, '')
    .replace(/\r\n/g, '\n')
    .trim();
}

export default async function ArtistPage({ params }: PageProps) {
  const { mbid } = await params;

  // Get initial setlist data to get artist name
  const setlistData = await getArtistSetlists(mbid, 1);
  
  if (!setlistData || !setlistData.setlist || setlistData.setlist.length === 0) {
    notFound();
  }

  const artistName = setlistData.setlist[0].artist.name;
  const totalConcerts = setlistData.total;

  // Get artist profile from Discogs (image and bio)
  const discogsProfile = await getArtistProfile(artistName);

  const imageUrl = discogsProfile?.imageUrl;
  const profile = formatProfile(discogsProfile?.profile || null);
  const externalUrls = discogsProfile?.urls || [];
  const members = discogsProfile?.members || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-8 pt-20 max-w-4xl mx-auto">
        {/* Back Link */}
        <Link 
          href="/search"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to search
        </Link>

        {/* Artist Header */}
        <div className="bg-card rounded-xl border border-border/40 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Artist Image */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0 mx-auto md:mx-0">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={artistName}
                  fill
                  sizes="(max-width: 768px) 192px, 224px"
                  className="rounded-xl object-cover border-4 border-primary/20"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                  <Music className="h-20 w-20 text-primary" />
                </div>
              )}
            </div>

            {/* Artist Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {artistName}
              </h1>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {totalConcerts.toLocaleString()} concerts recorded
                </span>
              </div>

              {/* External Links */}
              {externalUrls.length > 0 && (
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  {externalUrls.slice(0, 4).map((url, index) => {
                    let label = "Website";
                    if (url.includes("wikipedia")) label = "Wikipedia";
                    else if (url.includes("facebook")) label = "Facebook";
                    else if (url.includes("twitter") || url.includes("x.com")) label = "Twitter";
                    else if (url.includes("instagram")) label = "Instagram";
                    else if (url.includes("youtube")) label = "YouTube";
                    else if (url.includes("spotify")) label = "Spotify";
                    
                    return (
                      <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                      >
                        <Globe className="h-3 w-3" />
                        {label}
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Band Members */}
              {members.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Members</span>
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start gap-1">
                    {members.filter(m => m.active).slice(0, 8).map((member) => (
                      <span
                        key={member.id}
                        className="px-2 py-1 rounded bg-muted text-xs text-muted-foreground"
                      >
                        {member.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bio */}
          {profile && (
            <div className="mt-6 pt-6 border-t border-border/40">
              <h2 className="text-lg font-semibold text-foreground mb-3">About</h2>
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line line-clamp-[10]">
                {profile}
              </p>
            </div>
          )}
        </div>

        {/* Concert History */}
        <section className="bg-card rounded-xl border border-border/40 p-6">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Concert History
          </h2>
          
          <ArtistSetlistsClient mbid={mbid} initialTotal={totalConcerts} />
        </section>
      </main>
    </div>
  );
}
