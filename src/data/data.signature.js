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
        this.key = key;
        this.importModule = importModule;
    }

}

export {
    DataSignature,
};