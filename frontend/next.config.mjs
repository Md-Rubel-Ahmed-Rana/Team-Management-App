/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  devIndicators: {
    buildActivity: false,
  },
};

export default nextConfig;
