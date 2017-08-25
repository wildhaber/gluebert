const CONFIG = require('./../../e2e.conf');

function browseRelative(path) {
    return CONFIG.baseLocation + '/' + path;
}

module.exports = browseRelative;