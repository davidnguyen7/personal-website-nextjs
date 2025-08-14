/** @type {import('next').NextConfig} */
import NextBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
  transpilePackages: ['three'],
  webpack: config => {
    config.module.rules.push({
      test: /\.glsl$/,
      type: 'asset/source',
    });

    return config;
  },
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
