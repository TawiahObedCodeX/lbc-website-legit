/** @type {import('next').NextConfig} */
const nextConfig = {
  // Move it out of experimental to the top level
  allowedDevOrigins: [
  "localhost",
  "127.0.0.1",
  "172.20.10.2",
  "30.30.100.163",
],
  reactStrictMode: true,
};

module.exports = nextConfig;