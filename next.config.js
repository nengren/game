/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 静态导出
  images: {
    unoptimized: true,  // Cloudflare Pages不支持Next.js的图像优化
    domains: ['images.unsplash.com', 'joy-grid.com'],
  },
  trailingSlash: true,  // 确保URL以斜杠结尾
}

module.exports = nextConfig 