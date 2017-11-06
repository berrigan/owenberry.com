const merge = require('webpack-merge');
const common = require('./webpack.common.js');

let path = require('path');

module.exports = (env) => {

    console.log(__dirname);

    let commonConfig = common(env);

    return merge(commonConfig, {
        devtool: 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'static/dist'),
            compress: true,
            port: 8000,
            inline: true
        }
    });

};
