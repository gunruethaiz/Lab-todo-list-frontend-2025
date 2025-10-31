/** @type {import('next').NextConfig} */
const repoName = 'todo-frontend';
const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  output: 'export',
  basePath: isDev ? '' : `/${repoName}`,
  assetPrefix: isDev ? '' : `/${repoName}/`,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;