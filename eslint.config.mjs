import globals from "globals";
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],

    languageOptions: {
      parser: tsparser, // Use TypeScript parser for TS/JS files
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser, // Add browser globals
    },

    plugins: { react, "@typescript-eslint": tseslint },

    rules: {
      ...js.configs.recommended.rules, // JavaScript recommended rules
      ...tseslint.configs.recommended.rules, // TypeScript recommended rules
      ...react.configs.flat.recommended.rules, // React recommended rules
      "react/react-in-jsx-scope": "off", // React no longer requires React in scope
    },

    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
  },
];
