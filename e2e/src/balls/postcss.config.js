/*global module:true*/

module.exports = {
    plugins: {
        'autoprefixer': {
            browsers: 'last 4 versions',
            flexbox: false,
            grid: true,
        },
    },
    options: {
        sourceMap: true,
    },
};