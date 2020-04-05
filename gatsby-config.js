module.exports = {
  siteMetadata: {
    title: 'Noisy Notes',
    description: 'Easy Note taking app',
    author: '@batin'
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/logo.svg' // This path is relative to the root of the site.
      }
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Nunito',
          'Permanent Marker',
          'source sans pro\:300,400,400i,700'
        ],
        display: 'swap'
      }
    }
  ]
}
