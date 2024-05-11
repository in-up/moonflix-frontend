/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: {
    swcMinify: true,
    styledComponents: true,
  },
  redirects: async () => ([{
      source: '/api/:path*',
      destination: 'http:localhost:8000/:path*',
      permanent: false,
  }]),
  images: {
      domains: ["image.tmdb.org"],
  },
  env: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
};

export default nextConfig;
