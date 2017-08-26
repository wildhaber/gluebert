"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class represents ElementAbstract
 * @abstract
 */
var ElementAbstract = function () {

    /**
     * Create an Element
     * @param {object} data
     * @param {DocumentFragment} template - shadow dom template reference
     */
    function ElementAbstract(data, template) {
        _classCallCheck(this, ElementAbstract);

        this._data = data ? data : null;

        this._template = template instanceof DocumentFragment ? template : null;
    }

    /**
     * binds data to given shadow dom node
     */


    _createClass(ElementAbstract, [{
        key: "bindData",
        value: function bindData() {}

        /**
         * creates node
         * @return {Node}
         */

    }, {
        key: "create",
        value: function create() {
            if (!this._template) {
                return null;
            }

            this.bindData();
            return document.importNode(this._template, true);
        }
    }]);

    return ElementAbstract;
}();

exports.ElementAbstract = ElementAbstract;