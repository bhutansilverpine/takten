const { withPlugins } = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');

// next.js configuration
const nextConfig = {
  env: {
    STRIPE_PUBLIC_KEY: 'you_stripe_public_key_here',
    API_URL: 'http://localhost:4000/shop/graphql',
  },
  webpack: (config) => {
    config.resolve.modules.push(__dirname);

    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
};

module.exports = withPlugins([withOptimizedImages], nextConfig);
