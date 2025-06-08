import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import pluginJest from "eslint-plugin-jest";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"]
  },
  {
    files: ["**/*.{js,mjs,jsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } }
  },
  pluginReact.configs.flat.recommended,
  {
    settings: { react: { version: "detect" } },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    }
  },

  {
    files: ["**/*.test.{js,jsx}"],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: { ...globals.jest },
    },
    ...pluginJest.configs["flat/recommended"],
  }
]);
