import { NextResponse } from 'next/server';
import { getFeaturedArtists, FEATURED_ARTIST_NAMES } from '@/lib/discogs';

// Cache the response for 1 hour
export const revalidate = 3600;

/**
 * GET /api/artists/featured
 * 
 * Returns a list of featured artists with their images from Discogs.
 * Used on the homepage to display popular artists.
 * 
 * Query Parameters:
 * - count: Number of artists to return (default: 6, max: 12)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countParam = searchParams.get('count');
    const count = Math.min(
      Math.max(1, parseInt(countParam || '6', 10)),
      FEATURED_ARTIST_NAMES.length
    );

    const artists = await getFeaturedArtists(count);

    return NextResponse.json({
      success: true,
      data: artists,
      count: artists.length,
    });
  } catch (error) {
    console.error('Error fetching featured artists:', error);
    
    // Return fallback data if API fails
    const fallbackArtists = FEATURED_ARTIST_NAMES.slice(0, 6).map((name, index) => ({
      id: index,
      name,
      imageUrl: null,
      thumbnailUrl: null,
    }));

    return NextResponse.json({
      success: false,
      error: 'Failed to fetch artist images',
      data: fallbackArtists,
      count: fallbackArtists.length,
    });
  }
}
