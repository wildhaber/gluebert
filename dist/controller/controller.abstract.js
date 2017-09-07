'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class represents ControllerAbstract
 * @abstract
 */
var ControllerAbstract = function () {

    /**
     * Create a new ControllerAbstract instance
     * @param {HTMLElement} element
     * @param {DataObserver} data
     * @param {ElementBuilder} elements
     */
    function ControllerAbstract(element, data, elements) {
        _classCallCheck(this, ControllerAbstract);

        this._element = element;
        this._data = data;
        this._elements = elements;

        var elementReadyClass = typeof elements === 'object' && typeof elements.getElementReadyClass === 'function' ? elements.getElementReadyClass() : null;

        if (elementReadyClass) {
            this._element.classList.add(elementReadyClass);
        }
    }

    /**
     * Callback when HTMLElement removed from DOM
     */


    _createClass(ControllerAbstract, [{
        key: 'destruct',
        value: function destruct() {
            throw new Error('Controllers must provide a .destruct()-Method, fired, when HTMLElement is removed from DOM');
        }
    }]);

    return ControllerAbstract;
}();

exports.ControllerAbstract = ControllerAbstract;