/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['ably', 'mongoose'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js'
        }
      },
      resolveAlias: {
        underscore: 'lodash',
        mocha: { browser: 'mocha/browser-entry.js' }
      },
      resolveExtensions: [
        '.mdx',
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.mjs',
        '.json'
      ],
      moduleIdStrategy: 'deterministic'
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-6ac8e2b161f54ddc9fd2a84f09bb4bdb.r2.dev'
      },
      {
        protocol: 'https',
        hostname: 'wraglet-s3-local.s3.ap-southeast-1.amazonaws.com'
      }
    ]
  },
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true
    }
    return config
  }
}

export default nextConfig
