// .eslintrc.cjs
module.exports = {
  root: true,
  env: { browser: true, node: true, es2023: true },
  parserOptions: { ecmaFeatures: { jsx: true }, sourceType: 'module' },
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'prettier',
  ],
  settings: { react: { version: 'detect' } },
  ignorePatterns: [
    'dist',
    'build',
    'coverage',
    'node_modules',
    '.eslintrc.cjs',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
  },
}
