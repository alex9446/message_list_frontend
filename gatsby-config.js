module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Message List',
        start_url: '/',
        display: 'standalone',
        icon: 'src/images/favicon.svg',
        cache_busting_mode: 'none',
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
