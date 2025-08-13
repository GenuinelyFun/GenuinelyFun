export default {
  extends: ['stylelint-config-standard-less', 'stylelint-prettier/recommended'],
  ignoreFiles: ['node_modules', 'frontend/dist/**'],
  rules: {
    'block-no-empty': true,
    'selector-class-pattern': [
      '^[a-zA-Z]*[-_a-zA-Z0-9]*$',
      {
        message: (selector) =>
          `Expected class selector "${selector}" to be camelCase, PascalCase or following BEM naming convention`,
      },
    ],
    'keyframes-name-pattern': [
      '^[a-z][a-zA-Z0-9]*$',
      {
        message: (name) => `Expected keyframe name "${name}" to be camelCase`,
      },
    ],
  },
};
