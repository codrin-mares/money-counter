module.exports = {
  env: {
      browser: true, // Browser global variables like `window` etc.
      commonjs: true, // CommonJS global variables and CommonJS scoping.Allows require, exports and module.
      es6: true, // Enable all ECMAScript 6 features except for modules.
      jest: true, // Jest global variables like `it` etc.
      node: true // Defines things like process.env when generating through node
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jest/recommended",
    "plugin:testing-library/react"
  ],
  parser: "babel-eslint", // Uses babel-eslint transforms.
  parserOptions: {
      ecmaFeatures: {
          jsx: true
      },
      ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
      sourceType: "module" // Allows for the use of imports
  },
  plugins: [
    "import" // eslint-plugin-import plugin. https://www.npmjs.com/package/eslint-plugin-import
  ],
  root: true, // For configuration cascading.
  rules: {},
  settings: {
      react: {
          version: "detect" // Detect react version
      }
  },
  overrides: [
    {
        files: [ "**/*.ts?(x)" ],
        parser: "@typescript-eslint/parser",
        parserOptions: {
            ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
            sourceType: "module", // Allows for the use of imports
            ecmaFeatures: {
              jsx: true // Allows for the parsing of JSX
            }
        },
        settings: {
          react: {
            version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
          }
        },
        plugins: [
            "@typescript-eslint"
        ],
        extends: [
          "eslint:recommended",
          "plugin:jsx-a11y/recommended",
          "plugin:react-hooks/recommended",
          "plugin:jest/recommended",
          "plugin:testing-library/react",
          "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
          "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
          "plugin:prettier/recommended" // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
        ],
        // You can add Typescript specific rules here.
        // If you are adding the typescript variant of a rule which is there in the javascript
        // ruleset, disable the JS one.
        rules: {
          "prettier/prettier": [
            "error",
            {
              "endOfLine": "auto"
            },
          ],
        }
    }
  ],
};