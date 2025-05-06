module.exports = {
  extends: ["@commitlint/config-conventional"],
  "scope-enum": [
    2,
    "always",
    ["feet", "fweet", "portfolio", "articles", "homepage", "database"],
  ],
};
