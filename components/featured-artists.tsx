'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Artist {
  id: number;
  name: string;
  imageUrl: string | null;
  thumbnailUrl: string | null;
}

interface FeaturedArtistsResponse {
  success: boolean;
  data: Artist[];
  count: number;
  error?: string;
}

// Placeholder emoji icons for artists without images
const PLACEHOLDER_ICONS = ['🎤', '🎵', '🎶', '🎸', '🎹', '🎺', '🎷', '🥁', '🎻', '🎼', '🎧', '🎙️'];

export function FeaturedArtists() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArtists() {
      try {
        const response = await fetch('/api/artists/featured?count=6');
        const data: FeaturedArtistsResponse = await response.json();

        if (data.success || data.data) {
          setArtists(data.data);
        } else {
          setError(data.error || 'Failed to fetch artists');
        }
      } catch (err) {
        console.error('Error fetching featured artists:', err);
        setError('Failed to load artists');
      } finally {
        setLoading(false);
      }
    }

    fetchArtists();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="poster-card animate-pulse">
            <div className="w-24 h-36 sm:w-32 sm:h-48 bg-card rounded-sm shadow-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (error && artists.length === 0) {
    // Fallback to placeholder data
    const fallbackArtists = [
      'Taylor Swift', 'The Weeknd', 'Beyoncé', 
      'Coldplay', 'Bad Bunny', 'Drake'
    ];
    
    return (
      <ul className="flex justify-center gap-3 sm:gap-4 flex-wrap">
        {fallbackArtists.map((name, index) => (
          <li key={index} className="poster-card">
            <div className="w-24 h-36 sm:w-32 sm:h-48 bg-card rounded-sm flex items-center justify-center shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
              <div className="text-center p-2">
                <span className="text-3xl sm:text-4xl block mb-2">
                  {PLACEHOLDER_ICONS[index % PLACEHOLDER_ICONS.length]}
                </span>
                <p className="text-xs text-foreground font-medium truncate max-w-[80px] sm:max-w-[112px]">
                  {name}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex justify-center gap-3 sm:gap-4 flex-wrap">
      {artists.map((artist, index) => (
        <li key={artist.id || index} className="poster-card group">
          <div className="w-24 h-36 sm:w-32 sm:h-48 bg-card rounded-sm overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-all">
            {artist.imageUrl ? (
              <div className="relative w-full h-full">
                <Image
                  src={artist.imageUrl}
                  alt={artist.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 96px, 128px"
                  unoptimized // Discogs images are external
                />
                {/* Gradient overlay with name */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <p className="text-xs text-white font-medium truncate w-full">
                    {artist.name}
                  </p>
                </div>
                {/* Always visible name at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 group-hover:opacity-0 transition-opacity">
                  <p className="text-xs text-white font-medium truncate">
                    {artist.name}
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-2">
                  <span className="text-3xl sm:text-4xl block mb-2">
                    {PLACEHOLDER_ICONS[index % PLACEHOLDER_ICONS.length]}
                  </span>
                  <p className="text-xs text-foreground font-medium truncate max-w-[80px] sm:max-w-[112px]">
                    {artist.name}
                  </p>
                </div>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
