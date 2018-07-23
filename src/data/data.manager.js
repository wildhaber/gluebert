/**
 * Class represents DataManager
 * @class DataManager
 */
class DataManager {

    /**
     * Creates instance of DataManager
     * @param {DataObserver} dataRegistry
     * @param {DataSignature[]} data
     */
    constructor(dataRegistry, data = []) {
        this._registry = dataRegistry;

        this._data = (data instanceof Array)
            ? data
            : [];

        this._init();
    }

    /**
     * Initialize DataManager
     * @returns {DataManager}
     * @private
     */
    _init() {
        this._registerData();
        return this;
    }

    /**
     * register each dataSignature
     * in DataObserver registry
     * @returns {DataManager}
     * @private
     */
    _registerData() {
        this._data.forEach((data) => {
            this._registry.addSignature(data);
        });
        return this;
    }

}

export {
    DataManager,
};