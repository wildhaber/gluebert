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
                },
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader?name=[hash].[ext]',
                },
            },
            {
                test: /\.scss$/,
                exclude: /critical\.scss$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
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
        new webpack.optimize.UglifyJsPlugin({ mangle: true }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true,
            ignoreOrder: false,
        }),
        new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|html|ttf|woff|woff2|svg|eot)$/,
            threshold: 0,
            minRatio: 0.8,
        }),
    ],
    resolve: {
        alias: {
            // Enable this alias for local development.
            // aditional, please run npm run build:watch
            // on the root folder to build the dist/ packages

            // gluebert: path.resolve(__dirname, './../../../'),
        },
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, './static/'),
        publicPath: '/',
    },
};
