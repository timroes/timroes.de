const path = require('path');

module.exports = async function createPages({ graphql, actions }) {
  const { data } = await graphql(`
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { slug } = node.frontmatter;

    // Calculate full canonical URL for that page:
    const canonical = `${data.site.siteMetadata.siteUrl}/${slug}`;

    actions.createPage({
      path: slug,
      component: path.resolve(__dirname, '../src/templates/post.tsx'),
      context: {
        slug,
        canonical,
      }
    });
  });
}
