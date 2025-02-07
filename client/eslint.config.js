import js from '@eslint/js';
import globals from 'globals';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks/index.js';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import babelPlugin from '@babel/plugin-transform-private-property-in-object';

export default [
  {
    plugins: {
      "react": eslintReact,
      "react-hooks": eslintReactHooks,
      "react-refresh": eslintReactRefresh,
      prettier: prettierPlugin,
      "babel": babelPlugin,
    }
  },
  {
    ignores: ["node_modules", "public", "build", "coverage", "eslint.config.js", "**/*.{scss}"]
  },
  js.configs.recommended,
  {
    ...eslintReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021
      },
      parserOptions: eslintReact.configs.recommended.parserOptions,
    }
  },
  {
    files: ["**/*.{js,jsx}"],
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      "react-refresh/only-export-components": [ "warn", { allowConstantExport: true }],
      "react/jsx-curly-brace-presence": [ "warn", { props: 'never', children: "never"}],
      "react/function-component-definition": [ "warn", { namedComponents: "arrow-function"}],
      "react/self-closing-comp": ["error", { component: true, html: true }],
      "prefer-const": [ "error", { destructuring: "any", ignoreReadBeforeAssign: false } ],
      "prefer-destructuring": "off",
      "react/prop-types": "off",
      "no-unused-vars": "warn",
      camelcase: ["error", { ignoreDestructuring: true, properties: "never" }],
      eqeqeq: [ "error", "always", { null: "ignore" }],
    }
  }
];