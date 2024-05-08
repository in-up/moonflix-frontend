/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => ([{
        source: '/api/:path*',
        destination: 'http:localhost:8000/:path*',
        permanent: false,
    }]),
    images: {
        domains: ["image.tmdb.org"],
    }
};

export default nextConfig;

