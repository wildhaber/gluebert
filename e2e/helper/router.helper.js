/*global require module:true*/

const CONFIG = require('./../../e2e.conf');

function browseRelative(path) {
    return `${CONFIG.root}:${CONFIG.port}/${path}`;
}

module.exports = browseRelative;