const categories = require('../content/categories');

function createCategoryNodes(createNode) {
  Object.keys(categories).forEach(category => {
    createNode({
      id: `category-${category}`,
      internal: {
        type: 'PostCategory',
        contentDigest: JSON.stringify(categories[category]),
      },
      key: category,
      ...categories[category]
    });
  });
}

module.exports = ({ actions }) => {
  const { createNode } = actions;
  createCategoryNodes(createNode);
};
