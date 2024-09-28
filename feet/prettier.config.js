module.exports = {
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  overrides: [
    {
      files: '*.less',
      options: {
        singleQuote: false,
      },
    },
  ],
};
