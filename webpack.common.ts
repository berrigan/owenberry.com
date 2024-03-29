import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { fileLoaderRule, scssLoaderRules } from './webpack.rules';

function webpackConfig(env: any): webpack.Configuration {
    env = env || {};
    const commonHtmlWebpackPluginOptions: HtmlWebpackPlugin.Options = {
        favicon: 'assets/favicon.tiny.png',
        meta: {
            "gh-action-build-time": Date.now().toString()
        }
    };
    return {
        context: path.join(__dirname, 'src'),
        resolve: {
            modules: [
                path.join(__dirname, 'src'),
                'node_modules'
            ],
            preferRelative: true
        },
        entry: {
            home: ['pages/home/home.js', 'pages/home/home.scss'],
            sweetblossomcontainers: ['pages/sweetblossomcontainers/sweetblossomcontainers.js', 'pages/sweetblossomcontainers/sweetblossomcontainers.scss'],
        },
        output: {
            filename: '[name].[chunkhash].bundle.js',
            path: path.resolve(__dirname, 'docs')
        },
        module: {
            rules: [
                fileLoaderRule,
                scssLoaderRules.prod,
            ]
        },
        plugins: [
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [
                    '**/*',
                ],
            }),
            new HtmlWebpackPlugin({
                template: 'pages/home/home.html',
                chunks: ['home'],
                filename: 'index.html',
                ...commonHtmlWebpackPluginOptions,
            }),
            new HtmlWebpackPlugin({
                template: 'pages/sweetblossomcontainers/sweetblossomcontainers.html',
                chunks: ['sweetblossomcontainers'],
                filename: 'sweetblossomcontainers.html',
                ...commonHtmlWebpackPluginOptions,
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[chunkhash].css'
            }),
        ]
    };
}

export default webpackConfig;
