'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class represents ElementBuilder
 * @class ElementBuilder
 */
var ElementBuilder = function () {

    /**
     * Create ElementBuilder instance
     * @param {ElementSignature[]} signatures
     * @param {function} templateEngine
     * @param {function} schemaValidator
     */
    function ElementBuilder(signatures, templateEngine, schemaValidator) {
        _classCallCheck(this, ElementBuilder);

        this._schemaValidator = schemaValidator ? new schemaValidator() : null;
        this._templateEngine = (typeof templateEngine === 'undefined' ? 'undefined' : _typeof(templateEngine)) === 'object' ? templateEngine : null;
        this._signatures = this._transformToObject(signatures);
        this._elements = {};
    }

    /**
     * transform signatures array to {name: signature} object
     * @param {ElementSignature[]} signatures
     * @returns {object}
     * @private
     */


    _createClass(ElementBuilder, [{
        key: '_transformToObject',
        value: function _transformToObject(signatures) {
            var obj = {};
            signatures.forEach(function (signature) {
                obj[signature.name] = signature;
            });
            return obj;
        }

        /**
         * checks if element exists
         * @param {ElementSignature.<name>} name
         * @return {boolean}
         * @private
         */

    }, {
        key: '_elementExists',
        value: function _elementExists(name) {
            return _typeof(this._elements[name]) === 'object';
        }

        /**
         * get registered element
         * @param {ElementSignature.<name>} name
         * @return {object|null}
         */

    }, {
        key: 'getElement',
        value: function getElement(name) {
            return _typeof(this._elements[name]) === 'object' ? this._elements[name] : null;
        }

        /**
         * get signature
         * @param {ElementSignature.<name>} name
         * @return {object|null}
         */

    }, {
        key: 'getSignature',
        value: function getSignature(name) {
            return _typeof(this._signatures[name]) === 'object' ? this._signatures[name] : null;
        }

        /**
         * remove signature from registry
         * @param {ElementSignature.<name>} name
         * @return {ElementBuilder}
         */

    }, {
        key: 'removeSignature',
        value: function removeSignature(name) {
            if (this._signatureExists(name)) {
                delete this._signatures[name];
            }
            return this;
        }

        /**
         * checks if signature exists
         * @param {ElementSignature.<name>} name
         * @return {boolean}
         * @private
         */

    }, {
        key: '_signatureExists',
        value: function _signatureExists(name) {
            return _typeof(this._signatures[name]) === 'object';
        }

        /**
         * checks if signature is currently loading
         * @param {ElementSignature.<name>} name
         * @return {boolean}
         */

    }, {
        key: 'isBusySignature',
        value: function isBusySignature(name) {
            var signature = this.getSignature(name);
            return !!(signature && signature.busy);
        }

        /**
         * sets busy flag to
         * @param {ElementSignature.<name>} name
         * @return {ElementBuilder}
         */

    }, {
        key: 'setBusySignature',
        value: function setBusySignature(name) {
            var signature = this.getSignature(name);
            if (signature) {
                this._signatures[name].busy = true;
            }
            return this;
        }

        /**
         * get template element HTMLElement Node
         * @param {string|function} template - Template string or render function
         * @param {*} data - data
         * @return {Node}
         */

    }, {
        key: 'getTemplateElement',
        value: function getTemplateElement(template, data) {
            var templateElement = document.createElement('template');

            templateElement.innerHTML = this._templateEngine && _typeof(this._templateEngine) === 'object' && typeof this._templateEngine.render === 'function' ? this._templateEngine.render(template, data) : template;

            return templateElement.content;
        }

        /**
         * get schema reference
         * @param {ElementSignature.<name>} name
         * @return {object}
         */

    }, {
        key: 'getSchema',
        value: function getSchema(name) {
            var element = this.getElement(name);
            return element ? element.schema : null;
        }

        /**
         * validate data against schema
         * @param {ElementSignature.<name>} elementName
         * @param {*} data
         * @return {boolean}
         * @private
         */

    }, {
        key: '_validate',
        value: function _validate(elementName, data) {
            var schema = this.getSchema(elementName);

            if (this._schemaValidator && schema) {
                return this._schemaValidator.validate(schema, data);
            } else {
                return true;
            }
        }

        /**
         * adds element to registry
         * @param {ElementSignature.<name>} name
         * @param {object} schema
         * @param {string} template
         * @param {ElementAbstract} module
         * @return {ElementBuilder}
         */

    }, {
        key: 'addElement',
        value: function addElement(name, schema, template, module) {

            var templateView = this._templateEngine && _typeof(this._templateEngine) === 'object' ? this._templateEngine.createView(template) : template;

            this._elements[name] = {
                schema: schema,
                template: templateView,
                module: module
            };

            return this;
        }

        /**
         * loads dependency creates element by name and data
         * @param {ElementSignature.<name>} name
         * @param {*} data
         * @return {Promise}
         */

    }, {
        key: 'create',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(name, data) {
                var _this = this;

                var element, elementInstance, signature;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!this._elementExists(name)) {
                                    _context.next = 20;
                                    break;
                                }

                                if (!this._validate(name, data)) {
                                    _context.next = 16;
                                    break;
                                }

                                console.log('1');
                                console.log('2');
                                console.log('3');
                                element = this.getElement(name, data);

                                console.log(element);

                                console.log('5');
                                elementInstance = new element.module(data, this.getTemplateElement(element.template, data));

                                console.log(elementInstance);
                                console.log(data);
                                console.log(elementInstance.create);

                                console.log('6');
                                return _context.abrupt('return', elementInstance.create());

                            case 16:
                                console.log('7');
                                throw new Error('Create Element ' + name + ' failed. Given data do not match given schema.');

                            case 18:
                                _context.next = 33;
                                break;

                            case 20:
                                if (!(this._signatureExists(name) && !this.isBusySignature(name))) {
                                    _context.next = 28;
                                    break;
                                }

                                signature = this.getSignature(name);

                                this.setBusySignature(name);

                                _context.next = 25;
                                return Promise.all([signature.schemaImport(), signature.templateImport(), signature.elementImport()]).then(function (imports) {
                                    _this.addElement(name, imports[0], imports[1], imports[2]);

                                    if (_this._elementExists(name)) {
                                        _this.removeSignature(name);
                                        console.log(_this.create);
                                        return _this.create(name, data);
                                    } else {
                                        throw new Error('Unfortunately Element ' + name + ' could not have been instanciated.');
                                    }
                                }).catch(function (err) {
                                    console.log(err.stack);
                                    console.log(err.description);
                                    console.log(err.message);
                                    throw new Error('Unfortunately Element ' + name + ' could not have been instanciated. ' + err);
                                });

                            case 25:
                                return _context.abrupt('return', _context.sent);

                            case 28:
                                if (!(this._signatureExists(name) && this.isBusySignature(name))) {
                                    _context.next = 32;
                                    break;
                                }

                                return _context.abrupt('return', new Promise(function (resolve) {
                                    window.setTimeout(function () {
                                        resolve(_this.create(name, data));
                                    }, 100);
                                }));

                            case 32:
                                throw new Error('Element ' + name + ' is not have registered.');

                            case 33:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function create(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return create;
        }()
    }]);

    return ElementBuilder;
}();

exports.ElementBuilder = ElementBuilder;