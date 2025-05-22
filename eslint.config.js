import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default [
  ...compat.extends('standard'),
  {
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly'
      }
    },
    rules: {
      semi: ['error', 'never']
    }
  }
]
