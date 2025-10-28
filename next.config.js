/** @type {import('next').NextConfig} */
const nextConfig = {
  // OpenNext Cloudflare adapter will handle the build transformation
  images: {
    unoptimized: true, // Cloudflare Images handles optimization
  },
};

module.exports = nextConfig;
