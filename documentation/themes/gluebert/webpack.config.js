/* eslint-env node */
/* eslint-disable no-undef */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const ENTRY_POINTS = {
    critical: [
        './src/critical.js',
    ],
    app: [
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
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
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
                exclude: /critical\.scssä/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
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
            {
                test: /\.scss$/,
                include: /critical\.scss$/,
                use: ExtractTextPlugin.extract(
                    {
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: true,
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
        new webpack.optimize.UglifyJsPlugin({ mangle: true }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true,
            ignoreOrder: true,
        }),
        // new CompressionPlugin({
        //     algorithm: 'gzip',
        //     test: /\.(js|html)$/,
        //     threshold: 0,
        //     minRatio: 0.8,
        // }),
    ],
    output: {
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, './static/'),
    },
};
