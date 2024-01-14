/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "links.papareact.com",
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
    ],
  },
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
