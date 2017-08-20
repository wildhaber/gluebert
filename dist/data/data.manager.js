"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class represents DataManager
 * @class DataManager
 */
var DataManager = function () {

    /**
     * Creates instance of DataManager
     * @param {DataObserver} dataRegistry
     * @param {DataSignature[]} data
     */
    function DataManager(dataRegistry) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        _classCallCheck(this, DataManager);

        this._data = data;
        this._registry = dataRegistry;
        this._init();
    }

    /**
     * Initialize DataManager
     * @returns {DataManager}
     * @private
     */


    _createClass(DataManager, [{
        key: "_init",
        value: function _init() {
            this._registerData();
            return this;
        }

        /**
         * register each dataSignature
         * in DataObserver registry
         * @returns {DataManager}
         * @private
         */

    }, {
        key: "_registerData",
        value: function _registerData() {
            var _this = this;

            this._data.forEach(function (data) {
                _this._registry.addSignatures(data);
            });
            return this;
        }
    }]);

    return DataManager;
}();

exports.DataManager = DataManager;