/*global require module:true*/

import { HttpServer } from 'http-server';
const CONFIG = require('./../../e2e.conf');

class Server {
    constructor(root) {
        this._root = root;
        this._server = null;
    }

    async run() {
        this._server = new HttpServer({
            root: this._root,
            gzip: true,
        });

        return await this._server;
    }

    async close() {
        return (this._server) ? this._server.close() : true;
    }
}

module.exports = new Server(CONFIG.root);