/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  exportPathMap:
    process.env.KZ_STATIC_EXPORT === "1"
      ? async (paths) => {
          delete paths["/admin"];
          delete paths["/preview-medical"];
          return paths;
        }
      : undefined,
  distDir: process.env.NEXT_DIST_DIR || ".next",
  webpack: (config, { isServer }) => {
    if (isServer)
      config.externals.push({ "node:sqlite": "commonjs node:sqlite" });
    return config;
  },
  swcMinify: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
