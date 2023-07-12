var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin')
var webpack = require('webpack');

let path = require('path');

module.exports = (env) => {

    env = env || {};
    const isProduction = env.production === true;

    return {
        entry: {
            static_app: './static/src/js/static_app.js'
        },
        output: {
            filename: '[name].[chunkhash].bundle.js',
            path: path.resolve(__dirname, 'static/dist')
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
                template: './static/src/index.html'
            }),
            new miniCssExtractPlugin(),
        ]
    };

};





