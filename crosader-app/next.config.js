/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "staging.api.crosader.com",
      "stg-api.crosader.com",
      "api.crosader.com",
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/spaces",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
