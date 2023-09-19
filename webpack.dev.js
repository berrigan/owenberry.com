let path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

/**
 * @param {unknown} env 
 * @returns {webpack.Configuration}
 */
module.exports = (env) => {
    let commonConfig = common(env);
    return merge(commonConfig, {
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
            static: path.join(__dirname, 'docs'),
            compress: true,
            port: 8000,
            allowedHosts: 'auto',
            liveReload: true,
        },
    });
};
