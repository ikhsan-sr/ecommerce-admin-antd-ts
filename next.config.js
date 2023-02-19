const withLess = require('next-with-less');
const lessToJs = require('less-vars-to-js');
const fs = require('fs');

const paletteLess = fs.readFileSync('./src/styles/antd-vars.less', 'utf8');

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      { source: '/', destination: '/products', permanent: true },
    ];
  },
  swcMinify: true,
  images: {
    domains: JSON.parse(process.env.ALLOWED_IMAGE_DOMAINS || '[]'),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // just for get dummy image, remove this role after development
      },
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = withLess({
  ...nextConfig,
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: lessToJs(paletteLess, {
        resolveVariables: true,
        stripPrefix: true,
      }),
    },
  },
});
