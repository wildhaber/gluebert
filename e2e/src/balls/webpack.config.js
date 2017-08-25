const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ENTRY_POINTS = {
    index: [
        'babel-polyfill',
        './src/app.js',
    ],
};

module.exports = {
    entry: ENTRY_POINTS,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(html|twig|mustache|hbs)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src'],
                        interpolate: 'require',
                        minifyCSS: false,
                    },
                },
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract(
                    {
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                },
                            },
                            {
                                loader: 'postcss-loader',
                            },
                            {
                                loader: 'sass-loader',
                            },
                        ],
                    },
                ),
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: `src/index.html`,
        }]),
        new ExtractTextPlugin('[name].css'),
        new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|html)$/,
            threshold: 0,
            minRatio: 0.8,
        }),
    ],
    resolve: {
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js',
        },
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[chunkhash].js',
        path: path.resolve(__dirname, './../../demo/balls/'),
    },
};
