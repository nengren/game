/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 静态导出
  images: {
    unoptimized: true,  // Cloudflare Pages不支持Next.js的图像优化
    domains: ['images.unsplash.com', 'joy-grid.com'],
  },
  trailingSlash: true,  // 确保URL以斜杠结尾
  // 添加构建优化配置
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  // 添加环境变量配置
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://joy-grid.com',
  }
}

module.exports = nextConfig 