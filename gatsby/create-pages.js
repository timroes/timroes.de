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
              title
              category
              next
              prev
            }
          }
        }
      }
    }
  `);

  const titles = data.allMarkdownRemark.edges.reduce((prev, { node }) => {
    prev[node.frontmatter.slug] = node.frontmatter.title;
    return prev;
  }, {});

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { slug, next, prev, category } = node.frontmatter;

    // Calculate full canonical URL for that page:
    const canonical = `${data.site.siteMetadata.siteUrl}/${slug}`;

    let nextPost;
    if (next) {
      if (!titles[next]) {
        throw new Error(`Could not find next article with slug ${next} for article ${slug}.`);
      }
      nextPost = {
        slug: next,
        canonical: `${data.site.siteMetadata.siteUrl}/${next}`,
        title: titles[next],
      };
    }

    let prevPost;
    if (prev) {
      if (!titles[prev]) {
        throw new Error(`Could not find prev article with slug ${prev} for article ${slug}.`);
      }
      prevPost = {
        slug: prev,
        canonical: `${data.site.siteMetadata.siteUrl}/${prev}`,
        title: titles[prev],
      };
    }

    actions.createPage({
      path: slug,
      component: path.resolve(__dirname, '../src/templates/post.tsx'),
      context: {
        slug,
        canonical,
        category,
        next: nextPost,
        prev: prevPost,
      }
    });
  });
}
