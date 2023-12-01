import type webpack from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common';

function fnProdWebpackConfig(env: any): webpack.Configuration {
    const commonConfig = common(env);
    const merged = merge(commonConfig, {
        mode: 'production',
        devtool: 'source-map',
    });
    return merged;
}

export default fnProdWebpackConfig;
