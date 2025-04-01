/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  experimental: {
    turbo: {
      loaders: {
        '.svg': ['@svgr/webpack'],
      },
      resolveAlias: {
        '@': './src',
      },
    }
  }
}