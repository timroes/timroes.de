const Prism = require('prismjs');

module.exports = function onPreBootstrap() {
  // Add timelion language syntax highlighting to prismjs
  Prism.languages.timelion = {
    'timelion-fn': {
      pattern: /\.[A-Za-z_]+\(.*\)[,]?/,
      inside: {
        function: {
          pattern: /(^|,\s?|[()])\.[A-Za-z_]+/,
          lookbehind: true,
        },
        keyword: {
          pattern: /([a-zA-Z_]+(?=[=]))/,
        },
        string: [
          {
            pattern: /(\()[^,)]*(?=[,)])/,
            lookbehind: true,
          },
          {
            pattern: /(,\s?)[^,)]*(?=[,)])/,
            lookbehind: true,
          },
          {
            pattern: /(=)[^,)]*(?=[,)])/,
            lookbehind: true,
          },
        ]
      }
    },
  };
};
