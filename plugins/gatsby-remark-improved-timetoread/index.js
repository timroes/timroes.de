const visit = require('unist-util-visit');

function improvedTimeToReadPlugin(
  { markdownAST },
  params,
) {
  // console.log('Reached improvedTimeToReadPlugin', params);

  visit(markdownAST, (node) => {
    // console.log(`[${node.type}] ${node.value}`);
  });
}

// module.exports = improvedTimeToReadPlugin;
