/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'joy-grid.com'],
  },
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
  },
}

module.exports = nextConfig 