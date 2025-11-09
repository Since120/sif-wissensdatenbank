const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  // Optional: markdown file extensions (default: md, mdx)
  mdxOptions: {
    development: process.env.NODE_ENV === 'development',
  },
  // Disable git-based features that cause issues on Windows
  staticImage: true,
})

module.exports = withNextra({
  // Image optimization
  images: {
    unoptimized: true,
  },
  // Optional: Custom webpack configuration
  webpack: (config, options) => {
    return config
  },
})
