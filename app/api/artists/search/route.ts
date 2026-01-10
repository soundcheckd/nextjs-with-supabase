import { NextResponse } from 'next/server';
import { searchArtists } from '@/lib/setlistfm';

/**
 * GET /api/artists/search
 * 
 * Search for artists by name using Setlist.fm API.
 * Returns artists with their MBID for linking to profile pages.
 * 
 * Query Parameters:
 * - q: Artist name to search for (required)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required', artist: [] },
        { status: 400 }
      );
    }

    const results = await searchArtists(query);

    if (!results || !results.artist) {
      return NextResponse.json({
        artist: [],
        total: 0,
        page: 1,
        itemsPerPage: 20,
      });
    }

    return NextResponse.json({
      artist: results.artist,
      total: results.total,
      page: results.page,
      itemsPerPage: results.itemsPerPage,
    });
  } catch (error) {
    console.error('Error searching for artists:', error);
    
    return NextResponse.json(
      { error: 'Failed to search for artists', artist: [] },
      { status: 500 }
    );
  }
}
