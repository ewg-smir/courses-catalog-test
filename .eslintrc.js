module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['@eslint/js', 'prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-env'],
    },
  },
  plugins: ['prettier'],
  rules: {
    'no-unused-vars': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
  },
  overrides: [
    {
      files: ['*.html'],
      parser: 'eslint-plugin-html/parser',
    },
  ],
};
