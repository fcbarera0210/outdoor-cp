/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'randomuser.me', 'ui-avatars.com'],
    unoptimized: false,
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  // Optimizaciones de performance
  compress: true,
  poweredByHeader: false,
  // Headers para cache de archivos estáticos
  async headers() {
    return [
      {
        source: '/demos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
