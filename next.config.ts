/** @type {import('next').NextConfig} */
const nextConfig = {
  // Move it out of experimental to the top level
  allowedDevOrigins: ['172.20.10.2', 'localhost:3000'],
  reactStrictMode: true,
};

module.exports = nextConfig;