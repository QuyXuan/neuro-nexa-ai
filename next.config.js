/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["links.papareact.com"],
  },
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
