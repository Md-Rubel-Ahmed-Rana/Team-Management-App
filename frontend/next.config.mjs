/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "i.ibb.co", "lh3.googleusercontent.com"],
  },
  devIndicators: {
    buildActivity: false,
  },
};

export default nextConfig;
