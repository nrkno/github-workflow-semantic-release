export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [2, 'always', 256],
    'footer-max-line-length': [2, 'always', 256],
    'subject-max-length': [0],
    'subject-case': [0, 'always', 'lower-case'],  // Disable subject case rule
    'header-max-length': [2, 'always', 200]
  },
};
