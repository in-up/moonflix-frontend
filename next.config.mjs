/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    swcMinify: true,
    styledComponents: true,
  },
  redirects: async () => ([{
      source: '/api/:path*',
      destination: 'http://3.34.179.94/:path*',
      permanent: false,
  }]),
  images: {
      domains: ["image.tmdb.org"],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_TMDB_API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  },
};

export default nextConfig;
