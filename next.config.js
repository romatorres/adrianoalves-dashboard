/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
    ],
    domains: ["localhost", "utfs.io", "2jc6rnrlfu.ufs.sh"], // Adicione outros domínios conforme necessário
  },
};

module.exports = nextConfig;
