/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [500, 800, 1080, 1600, 2000, 2348],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.tutorplan.co',
          },
          {
            type: 'host',
            value: 'https://www.tutorplan.co',
          },
          {
            type: 'host',
            value: 'tutorplan.co',
          },
        ],
        destination: 'https://tutorplan.co/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
