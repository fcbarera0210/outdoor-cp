/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'randomuser.me' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
    unoptimized: false,
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig
