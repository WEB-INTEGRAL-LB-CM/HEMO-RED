module.exports = {
  env: { es6: true, node: true },
  extends: ["eslint:recommended"],
  parserOptions: { ecmaVersion: 2020 },
  rules: {
    "no-unused-vars": "error",
    "no-console": "warn",
    semi: ["error", "always"],
    quotes: ["error", "double"],
  },
};
