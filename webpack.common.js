const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin')

let path = require('path');

/**
 * @param {unknown} env
 * @returns {webpack.Configuration}
 */
module.exports = (env) => {
    env = env || {};
    return {
        entry: {
            static_app: './src/js/static_app.js'
        },
        output: {
            filename: '[name].[chunkhash].bundle.js',
            path: path.resolve(__dirname, 'docs')
        },
        module: {
            rules: [{
                test: /\.scss$/,
                use: [
                    miniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }]
        },
        plugins: [
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [
                    '**/*',
                    '!resume/**',
                ],
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new miniCssExtractPlugin(),
        ]
    };

};





