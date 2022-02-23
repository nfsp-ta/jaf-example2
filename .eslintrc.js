module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 0,
    'vue/multi-word-component-names': 0,
    'import/prefer-default-export': 0,
    'max-len': ['error', { code: 160 }],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false,
        },
      },
    ],
    'vuejs-accessibility/label-has-for': 0,
    'object-curly-newline': 0,
    'vuejs-accessibility/click-events-have-key-events': 0,
    camelcase: 0,
  },
};
