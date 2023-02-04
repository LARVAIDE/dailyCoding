module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'standard', 'plugin:react/jsx-runtime'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    semi: 0,
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/react-in-jsx-scope': 0,
    'no-unused-vars': 0,
    'no-nested-ternary': ['error'],
    'no-console': ['warn', { allow: ['warn', 'error', 'log'] }],
  },
};
