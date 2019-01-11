function assertFrontmatter(node, key) {
  if (!node.frontmatter || !node.frontmatter[key]) {
    throw new Error(`Every post must have a ${key} frontmatter entry. Missing in ${node.fileAbsolutePath}`);
  }
  return node.frontmatter[key];
}

/**
 * The onCreateNode method checks all
 */
module.exports = function onCreateNode({ node, actions }) {
  if (node.internal.type === 'MarkdownRemark') {
    assertFrontmatter(node, 'title');
    assertFrontmatter(node, 'date');
    const slug = assertFrontmatter(node, 'slug');

    actions.createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};
