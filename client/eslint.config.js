import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import noRelativeImportPaths from "eslint-plugin-simple-import-sort";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    plugins: { "simple-import-sort/imports": noRelativeImportPaths },
    extends: [
      js.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^(?!@|\\.)\\w+"],
            // Internal imports
            ["^@"],
            // Relative imports
            ["^\\."],
            // Side effect imports and type imports
            ["^\\u0000", "^.+\\u0000$"],
            // Style and asset imports
            [
              "\\.(css|scss|sass|less|styl|module.css|module.scss)$",
              "\\.(svg|png|jpg|jpeg|gif|webp|ico|mp4|webm|mp3|wav)$",
            ],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
]);
