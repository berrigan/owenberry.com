const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

let path = require('path');

module.exports = (env) => {

    let commonConfig = common(env);

    const devConfig = {
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
            static: path.join(__dirname, 'docs'),
            compress: true,
            port: 8000,
            liveReload: true,
            // inline: true
        }
    };

    // @ts-ignore
    return merge(commonConfig, devConfig);
};