'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DataAbstract = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Subject = require('rxjs/Subject');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Abstract Data object
 * @abstract
 */
var DataAbstract = function () {

    /**
     * Create instance of abstract Data object
     * @constructor
     * @param {DataObserver} dataPool - global instance of DataObserver
     */
    function DataAbstract(dataPool) {
        _classCallCheck(this, DataAbstract);

        this._dataPool = dataPool;
        this._observableSubject = new _Subject.Subject();
    }

    /**
     * get data observable object
     * @returns {Subject}
     */


    _createClass(DataAbstract, [{
        key: 'getObservable',
        value: function getObservable() {
            return this._observableSubject;
        }

        /**
         * handles pushed data from anywhere
         * @param {*} data
         * @returns {DataAbstract}
         */

    }, {
        key: 'push',
        value: function push(data) {
            if (this._observableSubject && !!data) {
                this._observableSubject.next(data);
            }
            return this;
        }
    }]);

    return DataAbstract;
}();

exports.DataAbstract = DataAbstract;