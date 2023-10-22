module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/jsx-runtime', 'standard', 'prettier'],
  ignorePatterns: ['**/node_modules/**', '**/dist/**'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'unused-imports', 'prettier', 'simple-import-sort', 'import'],
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages
          ['^@?\\w', '^node:'],
          // Custom
          [],
          // Relative & Styles
          ['^@\\/', '^\\.', 'less$', 'css$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'unused-imports/no-unused-imports': 'error',
    'no-magic-numbers': 'error',

    'react/jsx-uses-react': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'no-irregular-whitespace': 'off',
    'no-misleading-character-class': 'off',
    'n/no-callback-literal': 'off',
    'no-empty-pattern': 'off',
    'no-case-declarations': 'off',
  },
};
