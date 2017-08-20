import { Subject } from 'rxjs/Subject';

/**
 * Abstract Data object
 * @abstract
 */
class DataAbstract {

    /**
     * Create instance of abstract Data object
     * @constructor
     * @param {DataObserver} dataPool - global instance of DataObserver
     */
    constructor(dataPool) {
        this._dataPool = dataPool;
        this._observableSubject = new Subject();
    }

    /**
     * get data observable object
     * @returns {Subject}
     */
    getObservable() {
        return this._observableSubject;
    }

    /**
     * handles pushed data from anywhere
     * @param {*} data
     * @returns {DataAbstract}
     */
    push(data) {
        if(this._observableSubject) {
            this._observableSubject.next(data);
        }
        return this;
    }

}

export {
    DataAbstract,
};