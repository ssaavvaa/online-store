
const autoprefixer = require('autoprefixer');

module.exports = {
  siteMetadata: {
    title: `Starter`,
    description: `My Custom Starter`,
    author: `Anton Savytskyi`,
  },
  pathPrefix: "/online-store",
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-sass",
      options: {
        postCssPlugins: [
          autoprefixer()
        ],
        precision: 8
      }
    },
    {
      resolve: "gatsby-plugin-load-script",
      options: {
        src: "https://widget.cloudinary.com/v2.0/global/all.js",
      },
    },
    // {
    //   resolve: `gatsby-plugin-create-client-paths`,
    //   options: { prefixes: [`/products/*`, `/profile/*`] },
    // },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /svg/
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
