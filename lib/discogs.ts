/**
 * Discogs API Service
 * 
 * Handles all interactions with the Discogs API for fetching artist information,
 * images, and related data.
 */

const DISCOGS_BASE_URL = 'https://api.discogs.com';

// Rate limiting: Discogs allows 60 requests per minute for authenticated requests
const RATE_LIMIT_DELAY = 1100; // ~55 requests per minute to be safe

interface DiscogsArtist {
  id: number;
  name: string;
  resource_url: string;
  uri: string;
  images?: DiscogsImage[];
  profile?: string;
  urls?: string[];
  members?: { id: number; name: string; active: boolean }[];
}

interface DiscogsImage {
  type: 'primary' | 'secondary';
  uri: string;
  resource_url: string;
  uri150: string;
  width: number;
  height: number;
}

interface DiscogsSearchResult {
  id: number;
  type: string;
  title: string;
  thumb: string;
  cover_image: string;
  resource_url: string;
}

interface DiscogsSearchResponse {
  pagination: {
    page: number;
    pages: number;
    per_page: number;
    items: number;
  };
  results: DiscogsSearchResult[];
}

interface ArtistWithImage {
  id: number;
  name: string;
  imageUrl: string | null;
  thumbnailUrl: string | null;
}

export interface ArtistProfile {
  id: number;
  name: string;
  imageUrl: string | null;
  thumbnailUrl: string | null;
  profile: string | null;
  urls: string[];
  members: { id: number; name: string; active: boolean }[];
}

// In-memory cache for artist data
const artistCache = new Map<string, { data: ArtistWithImage; timestamp: number }>();
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

/**
 * Get authorization headers for Discogs API requests
 */
function getAuthHeaders(): HeadersInit {
  const consumerKey = process.env.DISCOGS_CONSUMER_KEY;
  const consumerSecret = process.env.DISCOGS_CONSUMER_SECRET;
  
  if (!consumerKey || !consumerSecret) {
    throw new Error('Discogs API credentials not configured');
  }
  
  return {
    'Authorization': `Discogs key=${consumerKey}, secret=${consumerSecret}`,
    'User-Agent': 'SoundCheckd/1.0 +https://soundcheckd.co',
    'Accept': 'application/json',
  };
}

/**
 * Sleep utility for rate limiting
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Search for an artist by name
 */
export async function searchArtist(artistName: string): Promise<DiscogsSearchResult | null> {
  try {
    const encodedName = encodeURIComponent(artistName);
    const url = `${DISCOGS_BASE_URL}/database/search?q=${encodedName}&type=artist&per_page=1`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders(),
      next: { revalidate: 86400 }, // Cache for 24 hours
    });
    
    if (!response.ok) {
      console.error(`Discogs search failed for "${artistName}": ${response.status}`);
      return null;
    }
    
    const data: DiscogsSearchResponse = await response.json();
    
    if (data.results && data.results.length > 0) {
      return data.results[0];
    }
    
    return null;
  } catch (error) {
    console.error(`Error searching for artist "${artistName}":`, error);
    return null;
  }
}

/**
 * Get detailed artist information by ID
 */
export async function getArtistById(artistId: number): Promise<DiscogsArtist | null> {
  try {
    const url = `${DISCOGS_BASE_URL}/artists/${artistId}`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders(),
      next: { revalidate: 86400 }, // Cache for 24 hours
    });
    
    if (!response.ok) {
      console.error(`Discogs artist fetch failed for ID ${artistId}: ${response.status}`);
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching artist ID ${artistId}:`, error);
    return null;
  }
}

/**
 * Get artist with their primary image
 * This is the main function to use for fetching artist data with images
 */
export async function getArtistWithImage(artistName: string): Promise<ArtistWithImage | null> {
  // Check cache first
  const cacheKey = artistName.toLowerCase();
  const cached = artistCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  try {
    // First, search for the artist
    const searchResult = await searchArtist(artistName);
    
    if (!searchResult) {
      return null;
    }
    
    // The search result includes thumbnail and cover image
    const artistData: ArtistWithImage = {
      id: searchResult.id,
      name: searchResult.title,
      imageUrl: searchResult.cover_image || null,
      thumbnailUrl: searchResult.thumb || null,
    };
    
    // If we need higher quality images, fetch full artist details
    if (!artistData.imageUrl || artistData.imageUrl === '') {
      await sleep(RATE_LIMIT_DELAY); // Rate limiting
      const fullArtist = await getArtistById(searchResult.id);
      
      if (fullArtist?.images && fullArtist.images.length > 0) {
        const primaryImage = fullArtist.images.find(img => img.type === 'primary') || fullArtist.images[0];
        artistData.imageUrl = primaryImage.uri;
        artistData.thumbnailUrl = primaryImage.uri150;
      }
    }
    
    // Cache the result
    artistCache.set(cacheKey, { data: artistData, timestamp: Date.now() });
    
    return artistData;
  } catch (error) {
    console.error(`Error getting artist with image for "${artistName}":`, error);
    return null;
  }
}

/**
 * Get multiple artists with their images
 * Handles rate limiting automatically
 */
export async function getMultipleArtistsWithImages(
  artistNames: string[]
): Promise<ArtistWithImage[]> {
  const results: ArtistWithImage[] = [];
  
  for (let i = 0; i < artistNames.length; i++) {
    const artistName = artistNames[i];
    
    // Rate limiting between requests
    if (i > 0) {
      await sleep(RATE_LIMIT_DELAY);
    }
    
    const artist = await getArtistWithImage(artistName);
    
    if (artist) {
      results.push(artist);
    } else {
      // Return placeholder data if artist not found
      results.push({
        id: 0,
        name: artistName,
        imageUrl: null,
        thumbnailUrl: null,
      });
    }
  }
  
  return results;
}

/**
 * Get full artist profile including bio
 */
export async function getArtistProfile(artistName: string): Promise<ArtistProfile | null> {
  try {
    // First, search for the artist
    const searchResult = await searchArtist(artistName);
    
    if (!searchResult) {
      return null;
    }
    
    // Fetch full artist details to get bio
    await sleep(RATE_LIMIT_DELAY);
    const fullArtist = await getArtistById(searchResult.id);
    
    if (!fullArtist) {
      return {
        id: searchResult.id,
        name: searchResult.title,
        imageUrl: searchResult.cover_image || null,
        thumbnailUrl: searchResult.thumb || null,
        profile: null,
        urls: [],
        members: [],
      };
    }
    
    let imageUrl = searchResult.cover_image || null;
    let thumbnailUrl = searchResult.thumb || null;
    
    if (fullArtist.images && fullArtist.images.length > 0) {
      const primaryImage = fullArtist.images.find(img => img.type === 'primary') || fullArtist.images[0];
      imageUrl = primaryImage.uri;
      thumbnailUrl = primaryImage.uri150;
    }
    
    return {
      id: fullArtist.id,
      name: fullArtist.name,
      imageUrl,
      thumbnailUrl,
      profile: fullArtist.profile || null,
      urls: fullArtist.urls || [],
      members: fullArtist.members || [],
    };
  } catch (error) {
    console.error(`Error getting artist profile for "${artistName}":`, error);
    return null;
  }
}

/**
 * Search for artists and return multiple results
 */
export async function searchArtists(artistName: string, perPage: number = 10): Promise<DiscogsSearchResult[]> {
  try {
    const encodedName = encodeURIComponent(artistName);
    const url = `${DISCOGS_BASE_URL}/database/search?q=${encodedName}&type=artist&per_page=${perPage}`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders(),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!response.ok) {
      console.error(`Discogs search failed for "${artistName}": ${response.status}`);
      return [];
    }
    
    const data: DiscogsSearchResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(`Error searching for artists "${artistName}":`, error);
    return [];
  }
}

/**
 * Featured artists configuration
 * These are popular artists that will be displayed on the homepage
 */
export const FEATURED_ARTIST_NAMES = [
  'Taylor Swift',
  'The Weeknd',
  'Beyoncé',
  'Coldplay',
  'Bad Bunny',
  'Drake',
  'Billie Eilish',
  'Ed Sheeran',
  'Kendrick Lamar',
  'Dua Lipa',
  'Harry Styles',
  'Post Malone',
];

/**
 * Get featured artists for the homepage
 * Returns a subset of popular artists with their images
 */
export async function getFeaturedArtists(count: number = 6): Promise<ArtistWithImage[]> {
  // Shuffle and select a subset of featured artists
  const shuffled = [...FEATURED_ARTIST_NAMES].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);
  
  return getMultipleArtistsWithImages(selected);
}
