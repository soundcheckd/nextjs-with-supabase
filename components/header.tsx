import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { signOutAction } from "@/app/actions";
import { Search } from "lucide-react";

export async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get user profile data if logged in
  let avatarUrl: string | null = null;
  let displayName: string | null = null;
  
  if (user) {
    avatarUrl = user.user_metadata?.avatar_url;
    displayName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0];
    
    // Try to get from social_users table
    const { data: socialUser } = await supabase
      .from('social_users')
      .select('image_url, display_name, username')
      .eq('user_id', user.id)
      .single();
    
    if (socialUser) {
      avatarUrl = socialUser.image_url || avatarUrl;
      displayName = socialUser.display_name || socialUser.username || displayName;
    }
  }

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
          {user ? (
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
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={displayName || 'Profile'}
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">
                      {displayName?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                )}
                <span className="hidden sm:inline">{displayName}</span>
              </Link>
              <form action={signOutAction}>
                <button 
                  type="submit"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign out
                </button>
              </form>
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
