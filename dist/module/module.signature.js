"use strict";

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

        this.name = name;
        this.selector = selector;
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
        key: "setSelector",
        value: function setSelector(selector) {
            this.selector = selector;
            return this;
        }

        /**
         * get defined selector
         * @return {string|null}
         */

    }, {
        key: "getSelector",
        value: function getSelector() {
            return this.selector;
        }

        /**
         * set controller import
         * @param {function} controller
         * @example
         * new ModuleSignature('example')
         *  .setModuleImport(() => import('./example.controller'));
         * @return {AbstractController}
         */

    }, {
        key: "setControllerImport",
        value: function setControllerImport(controller) {
            this.importController = controller;
            return this;
        }

        /**
         * get controller import method
         * @return {function|null}
         */

    }, {
        key: "getControllerImport",
        value: function getControllerImport() {
            return this.importController;
        }

        /**
         * set styles import
         * @param {function} styles
         * @return {ModuleSignature}
         */

    }, {
        key: "setStylesImport",
        value: function setStylesImport(styles) {
            this.importStyles = styles;
            return this;
        }

        /**
         * get styles import method
         * @return {function|null}
         */

    }, {
        key: "getStylesImport",
        value: function getStylesImport() {
            return this.importStyles;
        }

        /**
         * add element signature
         * @param {ElementSignature} elementSignature
         * @return {ModuleSignature}
         */

    }, {
        key: "addElementSignature",
        value: function addElementSignature(elementSignature) {
            this.elements.add(elementSignature);
            return this;
        }

        /**
         * get elements signatures
         * @return {Set} - set of ElementSignature
         */

    }, {
        key: "getElementSignatures",
        value: function getElementSignatures() {
            return this.elements;
        }
    }]);

    return ModuleSignature;
}();

exports.ModuleSignature = ModuleSignature;