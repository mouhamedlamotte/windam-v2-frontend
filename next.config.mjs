/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'windam.vercel.app',
      },
    ],
  },
};

export default nextConfig;
