import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import { fixupPluginRules } from '@eslint/compat';

export default tseslint.config(
    js.configs.recommended, tseslint.configs.recommended, react.config.recommended,
    react.configs.flat['jsx-runtime'],
    jsxA11y.flatConfigs.recommended,
  { ignores: ['dist'] },
  {
      settings: {
          react: {
              version: 'detect',
          },
      },
    extends: [ js.configs.recommended, ...tseslint.configs.recommended, prettier,],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-refresh': reactRefresh,
        'simple-import-sort': simpleImportSort,
        prettier: prettierPlugin,
        'unused-imports': unusedImports,
        'react-hooks': fixupPluginRules(reactHooks),
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
    },
  },
)
