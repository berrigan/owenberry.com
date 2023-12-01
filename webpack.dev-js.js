require('ts-node').register();
const webpackConfigModule = require('./webpack.dev.ts');
exports.default = webpackConfigModule.default;
