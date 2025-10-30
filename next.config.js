/** @type {import('next').NextConfig} */
const repoName = 'todo-frontend';
const nextConfig = {
  output: 'export',
  basePath: `/${repoName}`,     // เพิ่ม Base Path
  assetPrefix: `/${repoName}/`,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;