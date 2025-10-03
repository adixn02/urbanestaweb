/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker optimization
  output: 'standalone',
  // Configure for EC2 deployment with nginx proxy
  env: {
    PORT: process.env.PORT || '3012',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd1534m7jig9421.cloudfront.net',
        port: '',
        pathname: '/img-assets/**',
      },
      {
        protocol: 'https',
        hostname: 'urbanesta-assets.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/urbanesta-assets/**',
      }
    ],
    // Optimize image loading
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Add image optimization settings
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Configure qualities for Next.js 16 compatibility
    qualities: [75, 80, 85, 90, 95],
  },
      // Add compression
      compress: true,
      // Remove experimental features that cause issues
      experimental: {},
      // Performance optimizations
  
      webpack: (config, { dev, isServer }) => {
        if (!dev && !isServer) {
          config.optimization.splitChunks = {
            chunks: 'all',
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
              },
            },
          };
        }
        return config;
      },
};

export default nextConfig;
