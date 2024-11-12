module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb-typescript',
    'prettier'
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'vite.config.ts',
    'tailwind.config.js',
    'index.html'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.node.json', './tsconfig.app.json']
  },
  plugins: [
    '@typescript-eslint',
    'prefer-arrow',
    'prettier',
    'react',
    'react-hooks',
    'react-refresh'
  ],
  rules: {
    'no-continue': 'off',
    'no-bitwise': 'off',
    'no-param-reassign': [2, { props: false }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    'no-restricted-syntax': [
      'error',
      'FunctionExpression',
      'FunctionDeclaration'
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }
    ],
    'prefer-arrow/prefer-arrow-functions': [
      'warn',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false
      }
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'react/no-unknown-property': ['off', { ignore: ['JSX'] }],
    'react/jsx-props-no-spreading': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: true
      }
    ],
    'import/order': [
      1,
      {
        groups: [
          'external',
          'builtin',
          'internal',
          'sibling',
          'parent',
          'index'
        ]
      }
    ],

    'no-plusplus': 'off',
    'prettier/prettier': ['error'],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'import/prefer-default-export': 'off'
  }
};
