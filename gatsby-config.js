module.exports = {
  siteMetadata: {
    title: 'Tim Roes',
    description: 'Blog of Tim Roes, computer scientist and web enthusiast',
    siteUrl: 'https://www.timroes.de',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        // TODO: Configure
        output: '/feed.xml',
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
    'gatsby-plugin-less',
    'gatsby-plugin-sharp',
    'gatsby-plugin-svgr',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          // {
            //   resolve: 'gatsby-remark-improved-timetoread',
            //   options: {
              //     imageFactor: 2
              //   }
              // },
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-custom-blocks',
            options: {
              blocks: {
                info: {
                  classes: 'info-block',
                  title: 'optional',
                },
                warn: {
                  classes: 'warning-block',
                  title: 'optional',
                }
              }
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // maxWidth: 590,
              withWebp: true,
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true,
            }
          },
          'gatsby-remark-external-links',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-112812454-1',
        head: false,
        anonymize: true,
        respectDNT: true,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Tim Roes',
        short_name: 'Tim Roes',
        start_url: '/',
        background_color: '#f7f0eb',
        theme_color: '#a2466c',
        display: 'minimal-ui',
        icon: 'src/images/logo.png',
      },
    },
    'gatsby-plugin-offline',
  ]
};
