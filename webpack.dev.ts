import type webpack from 'webpack';
import 'webpack-dev-server';
import path from 'path';
import { mergeWithCustomize, customizeObject } from 'webpack-merge';
import common from './webpack.common';
import { fileLoaderRule, scssLoaderRules } from './webpack.rules';

function fndDevWebpackConfig(env: any): webpack.Configuration {
    const commonConfig = common(env);
    const devConfig: webpack.Configuration = {
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
    const merged = mergeWithCustomize({
        customizeObject: customizeObject({
            module: 'replace',
        })
    })(commonConfig, devConfig);
    return merged;
}

export default fndDevWebpackConfig;
