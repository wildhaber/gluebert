/**
 * Class representing DataSignature
 * @class DataSignature
 */
class DataSignature {

    /**
     * creates new DataSignature object
     * @param {string} key
     * @param {function} importModule
     */
    constructor(key, importModule) {
        this.key = typeof key === 'string' ? key : null;

        this.importModule = this.key && typeof importModule === 'function' ? importModule : () => new Promise(resolve => {
            require.ensure([], require => {
                resolve(require('./data.abstract'));
            });
        }).then(data => data.DataAbstract);
    }

}

export { DataSignature };