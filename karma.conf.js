/*global module:true*/

// Karma configuration
// Generated on Sun Aug 20 2017 20:38:14 GMT+0200 (CEST)

module.exports = (config) => {
    config.set({
        frameworks: ['jasmine'],
        files: [
            './node_modules/babel-polyfill/dist/polyfill.js',
            'src/**/*.spec.js',
        ],
        browsers: ['PhantomJS'],
        logLevel: config.LOG_ERROR,
        preprocessors: {
            ['src/**/*.js']: ['webpack'],
        },
        reporters: ['spec', 'coverage'],
        coverageReporter: {
            type: 'lcov',
            dir: './coverage/',
            subdir: function(browser, platform) {
                // normalization process to keep a consistent browser name
                return browser.toLowerCase().split(' ')[0];
            },
            reporters: [
                {
                    type: 'html',
                    subdir: 'report-html',
                },
                {
                    type: 'text-summary',
                },
                {
                    type: 'lcovonly',
                },
            ],
        },
        webpack: {
            cache: false,
            module: {
                rules: [
                    {
                        test: /\.js?$/,
                        exclude: /(node_modules)/,
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                    {
                        test: /\.js?$/,
                        exclude: /(node_modules|(\.spec\.js$))/,
                        loader: 'istanbul-instrumenter-loader',
                        options: {
                            cacheDirectory: true,
                            esModules: true,
                        },
                    },
                ],
            },
        },
        webpackMiddleware: {
            noInfo: true,
        },
    });
};
