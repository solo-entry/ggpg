/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io']
  },
  reactStrictMode: false,
  experimental: {
    missingSuspenseWithCSRBailout: false
  }
};

module.exports = nextConfig;
