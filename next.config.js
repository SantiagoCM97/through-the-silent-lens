/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.pexels.com", "storage.googleapis.com"],
  },
};

module.exports = nextConfig;
