const path = require('path');

module.exports = async ({ graphql, actions }) => {
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
              category
            }
            fields {
              slug
            }
          }
        }
      }
      allPostCategory {
        edges {
          node {
            key
            name
          }
        }
      }
    }
  `);

  const categories = data.allPostCategory.edges;
  console.log(categories);
  // TODO: Attach categories

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { slug, category } = node.frontmatter;

    actions.createPage({
      path: slug,
      component: path.resolve(__dirname, '../src/templates/post.tsx'),
      context: {
        slug: slug,
        category: {

        }
      }
    });
  });
}
