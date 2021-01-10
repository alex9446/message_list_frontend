module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Message List',
        short_name: 'Message List',
        start_url: '/',
        display: 'standalone',
        include_favicon: false,
        icon: 'src/images/favicon.png',
        icon_options: {
          purpose: 'any maskable'
        },
        cache_busting_mode: 'none',
        theme_color: '#ffffff',
        background_color: '#ffffff'
      }
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          globPatterns: ['**/icons/*']
        }
      }
    }
  ]
}
