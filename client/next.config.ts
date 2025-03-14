/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: ["images.unsplash.com", "assets.aceternity.com"],
    },

  experimental: {
    serverActions: {
      allowedForwardedHosts: ['localhost'],
      allowedOrigins: ['localhost:3030'],
      bodySizeLimit: '10mb',
    },
  }
};

export default nextConfig;
