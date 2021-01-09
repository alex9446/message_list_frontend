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
        background_color: '#ffffff'
      }
    }
  ]
}
