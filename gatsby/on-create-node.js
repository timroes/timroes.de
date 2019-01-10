// const categories = require('../content/categories');

function assertFrontmatter(node, key) {
  if (!node.frontmatter || !node.frontmatter[key]) {
    throw new Error(`Every post must have a ${key} frontmatter entry. Missing in ${node.fileAbsolutePath}`);
  }
  return node.frontmatter[key];
}

module.exports = ({ node, getNode, actions, ...rest }) => {
  if (node.internal.type === 'MarkdownRemark') {
    assertFrontmatter(node, 'title');
    assertFrontmatter(node, 'category');
    const slug = assertFrontmatter(node, 'slug');

    actions.createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};
