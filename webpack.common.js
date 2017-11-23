const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let path = require('path');

module.exports = (env) => {

    env = env || {};
    const isProduction = env.production === true;

    const extractSass = new ExtractTextPlugin({
        filename: '[name].[contenthash].css',
        disable: !isProduction
    });
    
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
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            includePath: ['.', '../node_modules/']
                        }
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
           }]
        },
        plugins: [
            new webpack.ProvidePlugin({ // inject ES5 modules as global vars
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Popper: 'popper.js'
            }),
            new CleanWebpackPlugin(['./static/dist']),
            new HtmlWebpackPlugin({
                template: './static/src/index.html'
            }),
            extractSass
        ]
    };

};





