"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ClientHeader } from "@/components/client-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Music, ArrowRight } from "lucide-react";

interface ArtistResult {
  mbid: string;
  name: string;
  sortName: string;
  disambiguation?: string;
}

interface SearchResponse {
  artist: ArtistResult[];
  total: number;
  page: number;
  itemsPerPage: number;
}

export default function SearchPage() {
  const router = useRouter();
  
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ArtistResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  async function performSearch(searchQuery: string) {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
      // Search for artists using Setlist.fm API
      const response = await fetch(
        `/api/artists/search?q=${encodeURIComponent(searchQuery)}`
      );
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const data: SearchResponse = await response.json();
      setResults(data.artist || []);
    } catch {
      setError('Failed to search. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  return (
    <div className="min-h-screen bg-background">
      <ClientHeader />
      
      <main className="container px-4 py-8 pt-20 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-2">Search Artists</h1>
        <p className="text-muted-foreground mb-6">
          Find artists and explore their complete concert history
        </p>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for an artist..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 bg-card h-12 text-base"
              />
            </div>
            <Button type="submit" disabled={loading || !query.trim()} className="h-12 px-6">
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Search"
              )}
            </Button>
          </div>
        </form>

        {/* Error State */}
        {error && (
          <div className="text-center py-8 text-destructive">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div className="space-y-3">
            {results.map((artist) => (
              <Link
                key={artist.mbid}
                href={`/artist/${artist.mbid}`}
                className="block bg-card rounded-xl border border-border/40 p-4 hover:border-primary/40 hover:bg-card/80 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center flex-shrink-0">
                    <Music className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                      {artist.name}
                    </h3>
                    {artist.disambiguation && (
                      <p className="text-sm text-muted-foreground truncate">
                        {artist.disambiguation}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && hasSearched && results.length === 0 && !error && (
          <div className="text-center py-16 text-muted-foreground">
            <Music className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No artists found for "{query}"</p>
            <p className="text-sm mt-2">Try a different search term</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !hasSearched && (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Discover Concert History
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Search for any artist to view their complete concert history, tour dates, and setlists from Setlist.fm
            </p>
            
            {/* Popular Searches */}
            <div className="mt-8">
              <p className="text-sm text-muted-foreground mb-3">Popular searches</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Taylor Swift", "Coldplay", "The Weeknd", "Beyoncé", "Ed Sheeran", "Billie Eilish"].map((name) => (
                  <button
                    key={name}
                    onClick={() => {
                      setQuery(name);
                      performSearch(name);
                    }}
                    className="px-4 py-2 rounded-full bg-card border border-border/40 text-sm text-foreground hover:border-primary/40 hover:bg-primary/5 transition-colors"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
