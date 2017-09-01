'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing ModuleSignature
 */
var ModuleSignature = function () {

    /**
     * creates new ModuleSignature object
     * @param {string} name - Module name
     * @param {string|null} selector
     */
    function ModuleSignature(name) {
        var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, ModuleSignature);

        this.name = name && typeof name === 'string' ? name : null;

        this.selector = selector && typeof selector === 'string' ? selector : null;

        this.importController = null;
        this.importStyles = null;
        this.elements = new Set();
    }

    /**
     * set controller selector
     * @param {string} selector - selector for document.querySelectorAll()
     * @example new ModuleSignature('example').setSelector('.example-class-selector')
     * @return {ModuleSignature}
     */


    _createClass(ModuleSignature, [{
        key: 'setSelector',
        value: function setSelector(selector) {
            this.selector = selector && typeof selector === 'string' ? selector : null;

            return this;
        }

        /**
         * get defined selector
         * @return {string|null}
         */

    }, {
        key: 'getSelector',
        value: function getSelector() {
            return this.selector;
        }

        /**
         * set controller import
         * @param {function} controller
         * @example
         * new ModuleSignature('example')
         *  .setImportController(() => import('./example.controller'));
         * @return {AbstractController}
         */

    }, {
        key: 'setImportController',
        value: function setImportController(controller) {
            this.importController = typeof controller === 'function' ? controller : null;

            return this;
        }

        /**
         * get controller import method
         * @return {function|null}
         */

    }, {
        key: 'getImportController',
        value: function getImportController() {
            return this.importController;
        }

        /**
         * set styles import
         * @param {function} styles
         * @return {ModuleSignature}
         */

    }, {
        key: 'setImportStyles',
        value: function setImportStyles(styles) {
            this.importStyles = typeof styles === 'function' ? styles : null;

            return this;
        }

        /**
         * get styles import method
         * @return {function|null}
         */

    }, {
        key: 'getImportStyles',
        value: function getImportStyles() {
            return this.importStyles;
        }

        /**
         * add element signature
         * @param {ElementSignature} elementSignature
         * @return {ModuleSignature}
         */

    }, {
        key: 'addElementSignature',
        value: function addElementSignature(elementSignature) {
            this.elements.add(elementSignature);
            return this;
        }

        /**
         * get elements signatures
         * @return {Set} - set of ElementSignature
         */

    }, {
        key: 'getElementSignatures',
        value: function getElementSignatures() {
            return this.elements;
        }
    }]);

    return ModuleSignature;
}();

exports.ModuleSignature = ModuleSignature;