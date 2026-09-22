import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.node },
        rules: {
            'no-console': 'off',
            'no-unused-vars': 'warn',
        },
    },
    eslintConfigPrettier,
]);
