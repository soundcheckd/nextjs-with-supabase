"use client";

import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Search, User } from "lucide-react";

interface UserData {
  id: string;
  email?: string;
  avatarUrl?: string;
  displayName?: string;
}

export function ClientHeader() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (authUser) {
          let avatarUrl = authUser.user_metadata?.avatar_url;
          let displayName = authUser.user_metadata?.full_name || authUser.user_metadata?.name || authUser.email?.split('@')[0];
          
          // Try to get from social_users table
          const { data: socialUser } = await supabase
            .from('social_users')
            .select('image_url, display_name, username')
            .eq('user_id', authUser.id)
            .single();
          
          if (socialUser) {
            avatarUrl = socialUser.image_url || avatarUrl;
            displayName = socialUser.display_name || socialUser.username || displayName;
          }
          
          setUser({
            id: authUser.id,
            email: authUser.email,
            avatarUrl,
            displayName,
          });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }
    
    getUser();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/soundcheckd-logo-outline-transparent.png"
            alt="Soundcheckd Logo"
            width={32}
            height={32}
            className="rounded"
          />
          <span className="font-semibold text-lg text-foreground">
            soundcheckd
          </span>
        </Link>
        
        <nav className="flex items-center gap-4 text-sm">
          {loading ? (
            <div className="w-7 h-7 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            // Logged in state
            <div className="flex items-center gap-4">
              <Link
                href="/search"
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="Search concerts"
              >
                <Search className="h-5 w-5" />
              </Link>
              <Link 
                href="/protected/my-profile" 
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {user.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt={user.displayName || 'Profile'}
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">
                      {user.displayName?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                )}
                <span className="hidden sm:inline">{user.displayName}</span>
              </Link>
              <button 
                onClick={handleSignOut}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            // Logged out state
            <>
              <Link href="/sign-in" className="text-muted-foreground hover:text-foreground transition-colors">
                Sign in
              </Link>
              <Link 
                href="/sign-up" 
                className="rounded-md bg-primary px-4 py-1.5 text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Create account
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
