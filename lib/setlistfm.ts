/**
 * Setlist.fm API Service
 * 
 * Handles all interactions with the Setlist.fm API for fetching concert/setlist data.
 */

const SETLISTFM_BASE_URL = 'https://api.setlist.fm/rest/1.0';

interface SetlistArtist {
  mbid: string;
  name: string;
  sortName: string;
  disambiguation?: string;
}

interface SetlistVenue {
  id: string;
  name: string;
  city: {
    id: string;
    name: string;
    state?: string;
    stateCode?: string;
    country: {
      code: string;
      name: string;
    };
  };
}

interface SetlistSet {
  song?: Array<{
    name: string;
    info?: string;
    cover?: SetlistArtist;
  }>;
  encore?: number;
}

export interface Setlist {
  id: string;
  eventDate: string;
  lastUpdated: string;
  artist: SetlistArtist;
  venue: SetlistVenue;
  tour?: {
    name: string;
  };
  sets?: {
    set: SetlistSet[];
  };
  url: string;
}

interface SetlistSearchResponse {
  type: string;
  itemsPerPage: number;
  page: number;
  total: number;
  setlist: Setlist[];
}

interface ArtistSearchResponse {
  type: string;
  itemsPerPage: number;
  page: number;
  total: number;
  artist: SetlistArtist[];
}

/**
 * Get authorization headers for Setlist.fm API requests
 */
function getAuthHeaders(): HeadersInit {
  const apiKey = process.env.SETLISTFM_API_KEY;
  
  if (!apiKey) {
    throw new Error('Setlist.fm API key not configured');
  }
  
  return {
    'x-api-key': apiKey,
    'Accept': 'application/json',
  };
}

/**
 * Search for setlists by artist name
 */
export async function searchSetlistsByArtist(
  artistName: string,
  page: number = 1
): Promise<SetlistSearchResponse | null> {
  try {
    const encodedName = encodeURIComponent(artistName);
    const url = `${SETLISTFM_BASE_URL}/search/setlists?artistName=${encodedName}&p=${page}`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders(),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      console.error(`Setlist.fm search failed: ${response.status}`);
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching setlists:', error);
    return null;
  }
}

/**
 * Search for setlists by venue
 */
export async function searchSetlistsByVenue(
  venueName: string,
  page: number = 1
): Promise<SetlistSearchResponse | null> {
  try {
    const encodedName = encodeURIComponent(venueName);
    const url = `${SETLISTFM_BASE_URL}/search/setlists?venueName=${encodedName}&p=${page}`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders(),
      next: { revalidate: 3600 },
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching setlists by venue:', error);
    return null;
  }
}

/**
 * Search for setlists by city
 */
export async function searchSetlistsByCity(
  cityName: string,
  page: number = 1
): Promise<SetlistSearchResponse | null> {
  try {
    const encodedName = encodeURIComponent(cityName);
    const url = `${SETLISTFM_BASE_URL}/search/setlists?cityName=${encodedName}&p=${page}`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders(),
      next: { revalidate: 3600 },
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching setlists by city:', error);
    return null;
  }
}

/**
 * Get a specific setlist by ID
 */
export async function getSetlistById(setlistId: string): Promise<Setlist | null> {
  try {
    const url = `${SETLISTFM_BASE_URL}/setlist/${setlistId}`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders(),
      next: { revalidate: 86400 }, // Cache for 24 hours
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching setlist:', error);
    return null;
  }
}

/**
 * Search for artists
 */
export async function searchArtists(
  artistName: string,
  page: number = 1
): Promise<ArtistSearchResponse | null> {
  try {
    const encodedName = encodeURIComponent(artistName);
    const url = `${SETLISTFM_BASE_URL}/search/artists?artistName=${encodedName}&p=${page}&sort=relevance`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders(),
      next: { revalidate: 3600 },
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching artists:', error);
    return null;
  }
}

/**
 * Get setlists for an artist by MBID
 */
export async function getArtistSetlists(
  mbid: string,
  page: number = 1
): Promise<SetlistSearchResponse | null> {
  try {
    const url = `${SETLISTFM_BASE_URL}/artist/${mbid}/setlists?p=${page}`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders(),
      next: { revalidate: 3600 },
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching artist setlists:', error);
    return null;
  }
}

/**
 * Format a setlist for display
 */
export function formatSetlistForDisplay(setlist: Setlist) {
  return {
    id: setlist.id,
    artist: setlist.artist.name,
    artistMbid: setlist.artist.mbid,
    venue: setlist.venue.name,
    city: setlist.venue.city.name,
    state: setlist.venue.city.state,
    country: setlist.venue.city.country.name,
    countryCode: setlist.venue.city.country.code,
    date: setlist.eventDate,
    tour: setlist.tour?.name,
    url: setlist.url,
    songCount: setlist.sets?.set?.reduce(
      (count, set) => count + (set.song?.length || 0), 
      0
    ) || 0,
  };
}
