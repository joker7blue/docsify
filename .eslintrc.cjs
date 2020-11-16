main();

async function main() {

const importSync = name =>
  // promiseSync(
  import(name)
    .then(result => {
      console.log('promise resolved');
      return result;
    })
    .catch(error => {
      console.log('promise error');
    });
// );

// Look, no await needed here!
console.log('import sync before');
const jestConfig = (await importSync('./jest.config')).default;
console.log('import sync after');

const testGlobals = {};

for (const key of Object.keys(jestConfig.globals)) {
  testGlobals[key] = 'readonly';
}

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['prettier', 'import'],
  extends: ['eslint:recommended', 'plugin:import/recommended'],
  settings: {
    'import/ignore': ['node_modules', '.json$'],
  },
  rules: {
    'prettier/prettier': ['error'],
    camelcase: ['warn'],
    'no-useless-escape': ['warn'],
    curly: ['error', 'all'],
    'dot-notation': ['error'],
    eqeqeq: ['error'],
    'handle-callback-err': ['error'],
    'new-cap': ['error'],
    'no-alert': ['error'],
    'no-caller': ['error'],
    'no-eval': ['error'],
    'no-labels': ['error'],
    'no-lonely-if': ['error'],
    'no-new': ['error'],
    'no-proto': ['error'],
    'no-return-assign': ['error'],
    'no-self-compare': ['error'],
    'no-shadow': ['warn'],
    'no-shadow-restricted-names': ['error'],
    'no-useless-call': ['error'],
    'no-var': ['error'],
    'no-void': ['error'],
    'no-with': ['error'],
    'no-prototype-builtins': 'off',
    radix: ['error'],
    'spaced-comment': ['error', 'always'],
    strict: ['error', 'global'],
    yoda: ['error', 'never'],

    // Import rules
    // Search way how integrate with `lerna`
    'import/no-unresolved': 'off',
    'import/imports-first': ['error'],
    'import/newline-after-import': ['error'],
    'import/no-duplicates': ['error'],
    'import/no-mutable-exports': ['error'],
    'import/no-named-as-default': ['error'],
    'import/no-named-as-default-member': ['error'],
    'import/order': ['warn'],
  },
  globals: {
    Docsify: 'writable',
    $docsify: 'writable',
    dom: 'writable',
  },

  overrides: [
    {
      files: ['test/**/*.js', '**/*.test.js'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      globals: testGlobals,
    },
    {
      files: ['test/e2e/**/*.test.js'],
      extends: ['plugin:jest-playwright/recommended'],
    },
  ],
};

}
