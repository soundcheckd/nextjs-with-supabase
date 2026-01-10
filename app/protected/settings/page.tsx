import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, User, Lock, Bell, Trash2 } from "lucide-react";
import { updateProfileAction, updatePasswordAction, deleteAccountAction } from "./actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage, Message } from "@/components/form-message";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Header } from "@/components/header";

export default async function SettingsPage(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Get user profile
  const { data: socialUser } = await supabase
    .from('social_users')
    .select('*')
    .eq('user_id', user.id)
    .single();

  const displayName = socialUser?.display_name || user.user_metadata?.full_name || '';
  const username = socialUser?.username || user.email?.split('@')[0] || '';
  const bio = socialUser?.bio || '';
  const location = socialUser?.location || '';
  const website = socialUser?.website || '';
  const avatarUrl = socialUser?.image_url || user.user_metadata?.avatar_url;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-8 pt-20 max-w-2xl mx-auto">
        {/* Back Link */}
        <Link 
          href="/protected/my-profile"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Profile
        </Link>

        <h1 className="text-2xl font-bold text-foreground mb-8">Settings</h1>

        {/* Profile Settings */}
        <section className="bg-card rounded-xl border border-border/40 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Profile</h2>
          </div>

          <form className="space-y-4">
            {/* Avatar Preview */}
            <div className="flex items-center gap-4 mb-6">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="Profile"
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">
                    {displayName.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
              )}
              <div className="text-sm text-muted-foreground">
                <p>Profile photos are managed in the mobile app</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  name="displayName"
                  defaultValue={displayName}
                  placeholder="Your name"
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-border bg-muted text-muted-foreground text-sm">
                    @
                  </span>
                  <Input
                    id="username"
                    name="username"
                    defaultValue={username}
                    placeholder="username"
                    className="bg-background rounded-l-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                name="bio"
                defaultValue={bio}
                placeholder="Tell us about yourself..."
                rows={3}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  defaultValue={location}
                  placeholder="City, Country"
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  defaultValue={website}
                  placeholder="https://yourwebsite.com"
                  className="bg-background"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <SubmitButton
                formAction={updateProfileAction}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Save Changes
              </SubmitButton>
            </div>
            
            <FormMessage message={searchParams} />
          </form>
        </section>

        {/* Appearance Settings */}
        <section className="bg-card rounded-xl border border-border/40 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Theme</p>
              <p className="text-sm text-muted-foreground">Select your preferred theme</p>
            </div>
            <ThemeSwitcher />
          </div>
        </section>

        {/* Password Settings */}
        <section className="bg-card rounded-xl border border-border/40 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Password</h2>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                placeholder="Enter current password"
                className="bg-background"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  className="bg-background"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <SubmitButton
                formAction={updatePasswordAction}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Update Password
              </SubmitButton>
            </div>
          </form>
        </section>

        {/* Account Info */}
        <section className="bg-card rounded-xl border border-border/40 p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Account Information</h2>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="text-foreground">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">User ID</span>
              <span className="text-foreground font-mono text-xs">{user.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email Verified</span>
              <span className="text-foreground">
                {user.email_confirmed_at ? '✓ Yes' : '✗ No'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account Created</span>
              <span className="text-foreground">
                {new Date(user.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-card rounded-xl border border-destructive/40 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="h-5 w-5 text-destructive" />
            <h2 className="text-lg font-semibold text-destructive">Danger Zone</h2>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>

          <form>
            <SubmitButton
              formAction={deleteAccountAction}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              pendingText="Deleting..."
            >
              Delete Account
            </SubmitButton>
          </form>
        </section>
      </main>
    </div>
  );
}
