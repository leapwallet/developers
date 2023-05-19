/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'build',
  basePath: '/developers',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
