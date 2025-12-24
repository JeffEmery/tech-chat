import js from "@eslint/js";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import { defineConfig, globalIgnores } from "eslint/config";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 **/
export default defineConfig([
  globalIgnores(["dist", "node_modules", "**/*.d.ts"]),
  {
    plugins: {
      turbo: turboPlugin,
      onlyWarn,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
    extends: [js.configs.recommended, tseslint.configs.recommended],
  },
]);
