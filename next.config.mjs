/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          "icons.llamao.fi",
          "storage.googleapis.com",
          "cdn.charmverse.io",
        ],
      },
      experimental: {
        serverComponentsExternalPackages: ['@sparticuz/chromium'],
      },
};

export default nextConfig;
