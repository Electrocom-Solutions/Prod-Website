/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during builds (optional, but recommended if you have type errors)
    ignoreBuildErrors: false,
  },
  async redirects() {
    return [
      { source: '/services/software-solutions', destination: '/services', permanent: true },
      { source: '/services/software-solutions/:path*', destination: '/services/:path*', permanent: true },
    ]
  },
}

module.exports = nextConfig

