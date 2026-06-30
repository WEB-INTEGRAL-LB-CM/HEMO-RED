module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always",
      ["feat","fix","hotfix","refactor","chore","docs","test","perf","build","ci","revert"]
    ],
    "subject-max-length": [2, "always", 72]
  }
};