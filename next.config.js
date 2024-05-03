/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: '127.0.0.1',
          },
          {
            protocol: 'https',
            hostname: 'raaniuqbenifoqpdzufe.supabase.co',
          },
          {
            protocol: 'https',
            hostname: 'trctzyutmhzdjopjayih.supabase.co/',
          },
          {
            protocol: 'https',
            hostname: 'randomuser.me'
          },
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com'
          },
          {
            protocol: 'https',
            hostname: 'images.pexels.com'
          }
        ],
      },
};

module.exports = nextConfig;
