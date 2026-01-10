"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Music, ExternalLink, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SetlistItem {
  id: string;
  artist: string;
  artistMbid: string;
  venue: string;
  city: string;
  state?: string;
  country: string;
  countryCode: string;
  date: string;
  tour?: string;
  url: string;
  songCount: number;
}

interface SetlistsResponse {
  setlists: SetlistItem[];
  total: number;
  page: number;
  itemsPerPage: number;
  totalPages: number;
}

interface ArtistSetlistsClientProps {
  mbid: string;
  initialTotal: number;
}

function formatDate(dateStr: string): string {
  // Setlist.fm uses DD-MM-YYYY format
  const [day, month, year] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function ArtistSetlistsClient({ mbid, initialTotal }: ArtistSetlistsClientProps) {
  const [setlists, setSetlists] = useState<SetlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(initialTotal / 20));
  const [total, setTotal] = useState(initialTotal);

  useEffect(() => {
    fetchSetlists(currentPage);
  }, [currentPage, mbid]);

  async function fetchSetlists(page: number) {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/artist/${mbid}/setlists?page=${page}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch setlists');
      }
      
      const data: SetlistsResponse = await response.json();
      setSetlists(data.setlists);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch {
      setError('Failed to load concerts. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (loading && setlists.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-destructive">
        {error}
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => fetchSetlists(currentPage)}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Results Info */}
      <p className="text-sm text-muted-foreground mb-4">
        Showing {((currentPage - 1) * 20) + 1} - {Math.min(currentPage * 20, total)} of {total.toLocaleString()} concerts
      </p>

      {/* Setlist List */}
      <div className="space-y-3">
        {setlists.map((setlist) => (
          <div
            key={setlist.id}
            className="flex items-start justify-between gap-4 p-4 rounded-lg bg-background/50 hover:bg-background transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                <span className="flex items-center gap-1 text-foreground font-medium">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  {formatDate(setlist.date)}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {setlist.venue}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {setlist.city}
                {setlist.state && `, ${setlist.state}`}
                {setlist.country && ` · ${setlist.country}`}
              </p>
              {setlist.tour && (
                <p className="text-xs text-primary mt-1">
                  {setlist.tour}
                </p>
              )}
              <div className="flex items-center gap-3 mt-2">
                {setlist.songCount > 0 && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Music className="h-3 w-3" />
                    {setlist.songCount} songs
                  </span>
                )}
                <a
                  href={setlist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  View setlist
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1 || loading}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {/* First page */}
            {currentPage > 3 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  className="w-8 h-8 p-0"
                >
                  1
                </Button>
                {currentPage > 4 && <span className="text-muted-foreground">...</span>}
              </>
            )}
            
            {/* Pages around current */}
            {Array.from({ length: 5 }, (_, i) => currentPage - 2 + i)
              .filter(p => p > 0 && p <= totalPages)
              .map(page => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 p-0"
                  disabled={loading}
                >
                  {page}
                </Button>
              ))
            }
            
            {/* Last page */}
            {currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && <span className="text-muted-foreground">...</span>}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  className="w-8 h-8 p-0"
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages || loading}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {loading && setlists.length > 0 && (
        <div className="flex justify-center py-4">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
}
