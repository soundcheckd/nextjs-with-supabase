"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const updateProfileAction = async (formData: FormData) => {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return redirect("/sign-in");
  }

  const displayName = formData.get("displayName")?.toString().trim();
  const username = formData.get("username")?.toString().trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
  const bio = formData.get("bio")?.toString().trim();
  const location = formData.get("location")?.toString().trim();
  const website = formData.get("website")?.toString().trim();

  // Validate username
  if (username && username.length < 3) {
    return encodedRedirect("error", "/protected/settings", "Username must be at least 3 characters");
  }

  // Validate website URL
  if (website && !website.match(/^https?:\/\/.+/)) {
    return encodedRedirect("error", "/protected/settings", "Website must be a valid URL starting with http:// or https://");
  }

  // Check if user already has a social_users record
  const { data: existingUser } = await supabase
    .from('social_users')
    .select('user_id')
    .eq('user_id', user.id)
    .single();

  if (existingUser) {
    // Update existing record
    const { error } = await supabase
      .from('social_users')
      .update({
        display_name: displayName || null,
        username: username || null,
        bio: bio || null,
        location: location || null,
        website: website || null,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id);

    if (error) {
      console.error('Profile update error:', error);
      if (error.code === '23505') {
        return encodedRedirect("error", "/protected/settings", "Username is already taken");
      }
      return encodedRedirect("error", "/protected/settings", "Failed to update profile");
    }
  } else {
    // Create new record
    const { error } = await supabase
      .from('social_users')
      .insert({
        user_id: user.id,
        email: user.email,
        display_name: displayName || null,
        username: username || user.email?.split('@')[0] || null,
        bio: bio || null,
        location: location || null,
        website: website || null,
      });

    if (error) {
      console.error('Profile create error:', error);
      if (error.code === '23505') {
        return encodedRedirect("error", "/protected/settings", "Username is already taken");
      }
      return encodedRedirect("error", "/protected/settings", "Failed to create profile");
    }
  }

  // Also update auth user metadata
  await supabase.auth.updateUser({
    data: {
      full_name: displayName,
      name: displayName,
    }
  });

  return encodedRedirect("success", "/protected/settings", "Profile updated successfully!");
};

export const updatePasswordAction = async (formData: FormData) => {
  const supabase = await createClient();
  
  const currentPassword = formData.get("currentPassword")?.toString();
  const newPassword = formData.get("newPassword")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  if (!currentPassword || !newPassword || !confirmPassword) {
    return encodedRedirect("error", "/protected/settings", "All password fields are required");
  }

  if (newPassword !== confirmPassword) {
    return encodedRedirect("error", "/protected/settings", "New passwords do not match");
  }

  if (newPassword.length < 6) {
    return encodedRedirect("error", "/protected/settings", "Password must be at least 6 characters");
  }

  // Update password
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.error('Password update error:', error);
    return encodedRedirect("error", "/protected/settings", "Failed to update password");
  }

  return encodedRedirect("success", "/protected/settings", "Password updated successfully!");
};

export const deleteAccountAction = async () => {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return redirect("/sign-in");
  }

  // Delete user data from social tables (cascades should handle related data)
  const { error: deleteError } = await supabase
    .from('social_users')
    .delete()
    .eq('user_id', user.id);

  if (deleteError) {
    console.error('Delete user data error:', deleteError);
  }

  // Sign out the user
  await supabase.auth.signOut();

  // Note: Actually deleting the auth user requires admin privileges
  // In production, you'd trigger a backend function or admin API call
  
  return redirect("/?deleted=true");
};
