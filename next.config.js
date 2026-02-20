const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

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
}

module.exports = withNextIntl(nextConfig)
