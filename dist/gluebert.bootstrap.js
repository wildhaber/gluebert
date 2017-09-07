'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Gluebert = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _module = require('./module/module.launcher');

var _data = require('./data/data.observer');

var _data2 = require('./data/data.manager');

var _element = require('./element/element.builder');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_OPTIONS = {
    elementReadyClass: 'gb-ready'
};

/**
 * Class represents Gluebert
 */

var Gluebert = function () {

    /**
     * @param {ModuleSignature[]} modules
     * @param {DataSignature[]} data
     * @param {object} options
     */
    function Gluebert(modules, data) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _classCallCheck(this, Gluebert);

        this._options = Object.assign({}, DEFAULT_OPTIONS, options);

        this._modules = modules instanceof Array ? modules : null;
        this._elements = this._modules ? this._extractElements(modules) : null;
        this._data = data instanceof Array ? data : null;
        this._schemaValidator = null;
        this._templateEngine = null;
    }

    _createClass(Gluebert, [{
        key: 'start',
        value: function start() {
            this._init();
            return this;
        }

        /**
         * start binding methods and properties
         * @private
         */

    }, {
        key: '_init',
        value: function _init() {

            this.elementBuilder = new _element.ElementBuilder(this._elements, this._templateEngine, this._schemaValidator, this._options);

            this.dataObserver = new _data.DataObserver();
            this.dataManager = new _data2.DataManager(this.dataObserver, this._data);
            this.moduleLauncher = new _module.ModuleLauncher(this._modules, this.dataObserver, this.elementBuilder);
        }

        /**
         * extract elements list from modules
         * @param {ModuleSignature[]} modules
         * @return {ElementSignature[]}
         * @private
         */

    }, {
        key: '_extractElements',
        value: function _extractElements(modules) {

            return modules.reduce(function (a, b) {
                var elements = b.getElementSignatures();
                if (elements.size) {
                    a.push.apply(a, _toConsumableArray(elements));
                }
                return a;
            }, []);
        }

        /**
         * set JSON Schema validator Gluebert uses for elements
         * @param schemaValidator
         * @return {Gluebert}
         */

    }, {
        key: 'setSchemaValidator',
        value: function setSchemaValidator(schemaValidator) {
            this._schemaValidator = typeof schemaValidator === 'function' ? schemaValidator : null;
            return this;
        }

        /**
         * set template engine
         * @param templateEngine
         * @return {Gluebert}
         */

    }, {
        key: 'setTemplateEngine',
        value: function setTemplateEngine(templateEngine) {
            this._templateEngine = typeof templateEngine === 'function' ? templateEngine : null;
            return this;
        }
    }]);

    return Gluebert;
}();

exports.Gluebert = Gluebert;