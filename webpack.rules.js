const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/** @typedef {import("webpack").RuleSetRule} RuleSetRule */

/** @type { RuleSetRule } */
const fileLoaderRule = {
    test: /\.(png|svg|jpg|gif)$/,
    use: [
        'file-loader'
    ]
};

/** @type {{ prod: RuleSetRule, dev: RuleSetRule }} */
const scssLoaderRules = {
    prod: {
        test: /\.scss$/,
        use: [
            MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
        ],
    },
    dev: {
        test: /\.scss$/,
        use: [
            "style-loader",
            "css-loader",
            "sass-loader",
        ],
    },
};

module.exports = {
    fileLoaderRule,
    scssLoaderRules,
};
