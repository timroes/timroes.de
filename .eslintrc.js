module.exports = {
  "parser": '@typescript-eslint/parser',
  "extends": [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  "settings": {
    "react": {
      "version": 'detect'
    }
  },
  "env": {
    "browser": true,
    "es6": true,
  },
  "plugins": [
    '@typescript-eslint',
    "react",
  ],
  "globals": {
    "graphql": false,
  },
  "rules": {
    // Disable prop-types as we use TypeScript for type checking
    "react/prop-types": "off",
    "react/display-name": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true,
    },
  }
}
