module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [2, 'always', 256],
    'footer-max-line-length': [2, 'always', 256],
    'subject-case': [0, 'always', 'lower-case']  // Disable subject case rule
  },
}
