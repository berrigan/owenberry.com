let path = require('path');
const webpack = require('webpack');
const { mergeWithCustomize, customizeObject } = require('webpack-merge');
const common = require('./webpack.common.js');
const { fileLoaderRule, scssLoaderRules } = require('./webpack.rules')

/**
 * @param {unknown} env 
 * @returns {webpack.Configuration}
 */
module.exports = (env) => {
    let commonConfig = common(env);

    /** @type {webpack.Configuration} */
    const devConfig = {
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
            static: path.join(__dirname, 'docs'),
            compress: true,
            port: 8000,
            allowedHosts: 'auto',
            hot: true,
        },
        module: {
            rules: [
                fileLoaderRule,
                scssLoaderRules.dev,
            ]
        }
    };

    return mergeWithCustomize({
        customizeObject: customizeObject({
            module: 'replace',
        })
    })(commonConfig, devConfig);
};
