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

        this._schemaValidator = schemaValidator && typeof schemaValidator === 'function' ? new schemaValidator() : null;

        this._templateEngine = (typeof templateEngine === 'undefined' ? 'undefined' : _typeof(templateEngine)) === 'object' ? templateEngine : null;

        this._signatures = signatures instanceof Array ? this._transformToObject(signatures) : {};

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

            if (signatures instanceof Array) {
                signatures.forEach(function (signature) {
                    if (signature && typeof signature.name === 'string') {
                        obj[signature.name] = signature;
                    }
                });
            }

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
            return !!name && typeof name === 'string' && _typeof(this._elements[name]) === 'object' && !!this._elements[name];
        }

        /**
         * get registered element
         * @param {ElementSignature.<name>} name
         * @return {object|null}
         */

    }, {
        key: 'getElement',
        value: function getElement(name) {
            return this._elementExists(name) ? this._elements[name] : null;
        }

        /**
         * get signature
         * @param {ElementSignature.<name>} name
         * @return {object|null}
         */

    }, {
        key: 'getSignature',
        value: function getSignature(name) {
            return this._signatureExists(name) ? this._signatures[name] : null;
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
            return _typeof(this._signatures[name]) === 'object' && !!this._signatures[name] && typeof this._signatures[name].name === 'string';
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
            if ('content' in document.createElement('template')) {
                return this._getTemplateElementShadow(template, data);
            } else {
                return this._getTemplateElementClassic(template, data);
            }
        }
    }, {
        key: '_getTemplateElementClassic',
        value: function _getTemplateElementClassic(template, data) {
            var templateElement = document.createElement('div');

            templateElement.innerHTML = this._templateEngine && _typeof(this._templateEngine) === 'object' && typeof this._templateEngine.render === 'function' ? this._templateEngine.render(template, data) : template;

            return templateElement.firstChild;
        }
    }, {
        key: '_getTemplateElementShadow',
        value: function _getTemplateElementShadow(template, data) {
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
            return element && (typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object' && typeof element.schema !== 'undefined' ? element.schema : null;
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
            if (!this._elementExists(elementName)) {
                return false;
            }

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
    }, {
        key: '_generateElement',
        value: function _generateElement(name, data) {
            if (this._validate(name, data)) {
                var element = this.getElement(name, data);

                var elementInstance = new element.module(data, this.getTemplateElement(element.template, data));

                return elementInstance.create();
            } else {
                throw new Error('Create Element ' + name + ' failed. Given data do not match given schema.');
            }
        }
    }, {
        key: '_loadElementModule',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(name, data) {
                var _this = this;

                var signature;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                signature = this.getSignature(name);

                                this.setBusySignature(name);

                                _context.next = 4;
                                return Promise.all([signature.schemaImport(), signature.templateImport(), signature.elementImport()]).then(function (imports) {
                                    _this.addElement(name, imports[0], imports[1], imports[2]);

                                    if (_this._elementExists(name)) {
                                        _this.removeSignature(name);
                                        return _this.create(name, data);
                                    } else {
                                        throw new Error('Unfortunately Element ' + name + ' could not have been instanciated.');
                                    }
                                }).catch(function (err) {
                                    throw new Error('Unfortunately Element ' + name + ' could not have been instanciated. ' + err);
                                });

                            case 4:
                                return _context.abrupt('return', _context.sent);

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function _loadElementModule(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return _loadElementModule;
        }()
    }, {
        key: '_retryCreate',
        value: function _retryCreate(name, data) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                window.setTimeout(function () {
                    try {
                        resolve(_this2.create(name, data));
                    } catch (err) {
                        reject(err);
                    }
                }, 100);
            });
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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(name, data) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!this._elementExists(name)) {
                                    _context2.next = 4;
                                    break;
                                }

                                return _context2.abrupt('return', this._generateElement(name, data));

                            case 4:
                                if (!(this._signatureExists(name) && !this.isBusySignature(name))) {
                                    _context2.next = 8;
                                    break;
                                }

                                return _context2.abrupt('return', this._loadElementModule(name, data));

                            case 8:
                                if (!(this._signatureExists(name) && this.isBusySignature(name))) {
                                    _context2.next = 12;
                                    break;
                                }

                                return _context2.abrupt('return', this._retryCreate(name, data));

                            case 12:
                                return _context2.abrupt('return', null);

                            case 13:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function create(_x3, _x4) {
                return _ref2.apply(this, arguments);
            }

            return create;
        }()
    }]);

    return ElementBuilder;
}();

exports.ElementBuilder = ElementBuilder;