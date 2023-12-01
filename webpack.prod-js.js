require('ts-node').register();
const webpackConfigModule = require('./webpack.prod.ts');
exports.default = webpackConfigModule.default;
