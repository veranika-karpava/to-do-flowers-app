const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');
const globals = require('globals');

module.exports = [
  {
    plugins: {
      prettier: prettierPlugin,
    },
  },
  {
    ignores: ['node_modules', 'public', 'build', 'coverage', 'eslint.config.js'],
  },
  prettierConfig,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      // ESLint rules
      'prefer-destructuring': 'off',
      'no-unused-vars': 'warn',
      'prefer-const': [
        'error',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: false,
        },
      ],
      camelcase: [
        'error',
        {
          ignoreDestructuring: true,
          properties: 'never',
        },
      ],
      eqeqeq: [
        'error',
        'always',
        {
          null: 'ignore',
        },
      ],
    },
  },
];
