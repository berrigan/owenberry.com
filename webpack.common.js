const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let path = require('path');

/**
 * @param {unknown} env
 * @returns {webpack.Configuration}
 */
module.exports = (env) => {
    env = env || {};
    return {
        context: path.resolve(__dirname, 'src'),
        resolve: {
            modules: [
                path.resolve(__dirname, 'src'),
                'node_modules'
            ],
            preferRelative: true,
        },
        entry: {
            home: ['pages/home/home.js', 'pages/home/home.scss'],
            about: ['pages/about/about.js', 'pages/about/about.scss'],
        },
        output: {
            filename: '[name].[chunkhash].bundle.js',
            path: path.resolve(__dirname, 'docs')
        },
        module: {
            rules: [{
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                template: 'pages/home/home.html',
                chunks: ['home'],
                filename: 'index.html',
            }),
            new HtmlWebpackPlugin({
                template: 'pages/about/about.html',
                chunks: ['about'],
                filename: 'about.html',
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[chunkhash].css'
            }),
        ]
    };

};





