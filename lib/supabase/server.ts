import { createServerClient } from '@supabase/ssr'
import { type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return (cookies() as any).get(name)?.value ?? ''
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            (cookies() as any).set({
              name,
              value,
              ...options,
              sameSite: 'lax',
              secure: process.env.NODE_ENV === 'production',
            })
          } catch (error) {
            // Handle cookie error in development
            if (process.env.NODE_ENV !== 'production') {
              console.warn('Error setting cookie:', error)
            }
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            (cookies() as any).delete(name)
          } catch (error) {
            // Handle cookie error in development
            if (process.env.NODE_ENV !== 'production') {
              console.warn('Error removing cookie:', error)
            }
          }
        },
      },
    }
  )
} 