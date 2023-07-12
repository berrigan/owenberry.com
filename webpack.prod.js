const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

// CLEAN up old builds first too ... maybe move into fuller script??

// "build": "webpack -p --env.production --config webpack.prod.js && ./node_modules/.bin/ts-node ./scripts/generate-pdf.ts",

module.exports = (env) => {

    let commonConfig = common(env);

    const prodConfig = {
        mode: 'production',
        devtool: 'source-map',
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            })
        ]
    };

    // @ts-ignore
    return merge(commonConfig, prodConfig);
};
