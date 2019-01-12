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

    actions.createPage({
      path: slug,
      component: path.resolve(__dirname, '../src/templates/post.tsx'),
      context: {
        slug: slug,
      }
    });
  });
}
