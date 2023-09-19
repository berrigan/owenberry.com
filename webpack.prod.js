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
        mode: 'production',
        devtool: 'source-map',
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            })
        ]
    });
};
