import reactConfig from "@repo/eslint-config/react-internal";
import { defineConfig } from "eslint/config";

/** @type {import("eslint").Linter.Config} */
export default defineConfig([
  {
    extends: [reactConfig],
  },
]);
