import type webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

type EnvironmentRuleSetRules = {
    dev: webpack.RuleSetRule;
    prod: webpack.RuleSetRule;
}

export const fileLoaderRule: webpack.RuleSetRule = {
    test: /\.(png|svg|jpg|gif)$/,
    use: [
        'file-loader'
    ]
};

export const scssLoaderRules: EnvironmentRuleSetRules = {
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
