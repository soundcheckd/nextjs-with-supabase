module.exports = {
  apps: [{
    name: 'soundcheckd-web',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/soundcheckd_web',
    env_production: {
      NODE_ENV: 'production',
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://soundcheckd.co',
      DISCOGS_CONSUMER_KEY: process.env.DISCOGS_CONSUMER_KEY,
      DISCOGS_CONSUMER_SECRET: process.env.DISCOGS_CONSUMER_SECRET,
      SETLISTFM_API_KEY: process.env.SETLISTFM_API_KEY,
    }
  }]
}
