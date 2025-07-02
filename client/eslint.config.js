import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

import js from "@eslint/js";
export default [
  {
    ignores: ["dist"],
  },
  {
    files: ["**/*.{js,jsx}"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // React, Next.js and external packages (npm/node_modules)
            ["^react", "^(?!@|\\.)\\w+"],
            // Internal imports
            ["^@"],
            // Relative imports
            ["^\\."],
            // Side effect imports and type imports
            ["^\\u0000", "^.+\\u0000$"],
            // Style and asset imports
            ["\\.(svg|png|jpg|jpeg|gif|webp|ico|mp4|webm|mp3|wav)$"],
            ["\\.(css|scss|sass|less|styl|module.css|module.scss)$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
    },
  },
];
