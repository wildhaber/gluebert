/* eslint-env node */
/* eslint-disable no-undef */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const ENTRY_POINTS = {
    app: [
        'babel-polyfill',
        './src/app.js',
    ],
    critical: [
        './src/critical.js',
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
        new webpack.optimize.UglifyJsPlugin({ mangle: true }),
        new ExtractTextPlugin('[name].css'),
        new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|html)$/,
            threshold: 0,
            minRatio: 0.8,
        }),
    ],
    output: {
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, './static/'),
    },
};
