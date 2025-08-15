module.exports = {
  extends: ['@commitlint/config-conventional'],
  'scope-enum': [
    2,
    'always',
    ['dev', 'feet', 'fweet', 'inno', 'portfolio', 'articles', 'homepage'],
  ],
};
