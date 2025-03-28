// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from "globals";

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.node,
            }
        },
        rules: {
            "@typescript-eslint/no-unused-vars": "error",
            "no-undef": "error",
            "prefer-const": "error",
            "no-console": "warn",
            "@typescript-eslint/array-type": ["error", { "default": "generic" }]
        },
    },
    {
        ignores: ["**/coverage/", "eslint.config.js", "src/index.ts"]
    }
);