'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ElementSignature = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _element = require('./element.abstract');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class represents ElementSignature
 * @class
 * @example new ElementSignature('xyz.element', () => import('./xyz.template.twig'))
 * @example new ElementSignature('xyz.element', () => import('./xyz.template.html'))
 * @example new ElementSignature('xyz.element')
 */
var ElementSignature = function () {

    /**
     * @param {string} name - name of the element usage will be referenced to this given name
     * @param {function|null} template - callback function for template import
     */
    function ElementSignature(name) {
        var template = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, ElementSignature);

        this.name = typeof name === 'string' ? name : null;

        this.schemaImport = function () {
            return Promise.resolve();
        };
        this.templateImport = function () {
            return Promise.resolve('<div>Missing template specification for ' + name + '.</div>');
        };
        this.elementImport = function () {
            return Promise.resolve(_element.ElementAbstract);
        };

        if (template) {
            this.setTemplateImport(template);
        }
    }

    /**
     * set import schema callback
     * @param {function} schema
     * @return {ElementSignature}
     * @example signature.setImportSchema(() => import('./xyz.schema.json'));
     */


    _createClass(ElementSignature, [{
        key: 'setImportSchema',
        value: function setImportSchema(schema) {
            if (typeof schema === 'function') {
                this.schemaImport = schema;
            }
            return this;
        }

        /**
         * get import schema callback
         * @return {function|null}
         */

    }, {
        key: 'getImportSchema',
        value: function getImportSchema() {
            return this.schemaImport;
        }

        /**
         * set template import callback
         * @param {function} template
         * @return {ElementSignature}
         * @example signature.setTemplateImport(() => import('./xyz.template.html'));
         * @example signature.setTemplateImport(() => import('./xyz.template.twig'));
         */

    }, {
        key: 'setTemplateImport',
        value: function setTemplateImport(template) {
            if (typeof template === 'function') {
                this.templateImport = template;
            }
            return this;
        }

        /**
         * get template import promise
         * @return {function|null}
         */

    }, {
        key: 'getTemplateImport',
        value: function getTemplateImport() {
            return this.templateImport;
        }

        /**
         * set element import callback
         * @param {function} element
         * @return {ElementSignature}
         * @example signature.setElementImport(() => import('./xyz.element').then((element) => element.XyzElement));
         */

    }, {
        key: 'setElementImport',
        value: function setElementImport(element) {
            if (typeof element === 'function') {
                this.elementImport = element;
            }
            return this;
        }

        /**
         * get element import callback
         * @return {function|null}
         */

    }, {
        key: 'getElementImport',
        value: function getElementImport() {
            return this.elementImport;
        }
    }]);

    return ElementSignature;
}();

exports.ElementSignature = ElementSignature;