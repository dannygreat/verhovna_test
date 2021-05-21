const config = require("./jest.config");

module.exports = {
    ...config,
    testMatch: [
        "**/ui_test/spec/*.spec.ts"
    ],
    testTimeout: 300000
};