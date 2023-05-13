/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'build',
  basePath: '/deeplink-generator',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
