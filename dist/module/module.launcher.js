'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing ModuleLauncher
 */
var ModuleLauncher = function () {

    /**
     * Creates instance of ModuleLauncher
     * @param modules
     * @param {DataObserver} dataObserver
     * @param {ElementBuilder} elementBuilder
     * @constructor
     */
    function ModuleLauncher() {
        var modules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var dataObserver = arguments[1];
        var elementBuilder = arguments[2];

        _classCallCheck(this, ModuleLauncher);

        this._modules = modules;
        this._dataObserver = dataObserver;
        this._elementBuilder = elementBuilder;

        this._observeDomMutation = this._observeDomMutation.bind(this);
        this._observer = new MutationObserver(this._observeDomMutation);

        this._instanceMap = new Map();
        this._stylesLoaded = new Set();

        if (modules.length) {
            this._init();
        }
    }

    _createClass(ModuleLauncher, [{
        key: '_init',
        value: function _init() {
            this.registerObserver(document.body);
            this._bootstrap();
        }
    }, {
        key: 'registerObserver',
        value: function registerObserver(element, options) {
            var _options = Object.assign({
                attributes: false,
                childList: true,
                characterData: false,
                subtree: true
            }, options);

            this._observer.observe(element, _options);
        }
    }, {
        key: '_eachModule',
        value: function _eachModule() {
            var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (typeof callback === 'function') {
                for (var i = 0, l = this._modules.length; i < l; i++) {
                    callback(this._modules[i]);
                }
            }
        }
    }, {
        key: '_addInstance',
        value: function _addInstance(element, instance) {
            this._instanceMap.set(element, instance);
        }
    }, {
        key: '_destructInstance',
        value: function _destructInstance(element) {
            var instance = this._instanceMap.get(element);
            if (instance) {
                if (typeof instance.destruct === 'function') {
                    instance.destruct();
                }
                this._instanceMap.delete(element);
            }
        }
    }, {
        key: '_bindController',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(elements, signature) {
                var controller, i, l, element;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!elements.length) {
                                    _context.next = 6;
                                    break;
                                }

                                _context.next = 3;
                                return signature.importController();

                            case 3:
                                controller = _context.sent;


                                if (!this._stylesLoaded.has(signature.name)) {
                                    this._addStyles(signature.name, signature.importStyles);
                                }

                                for (i = 0, l = elements.length; i < l; i++) {
                                    element = elements[i];

                                    if (!this._instanceMap.has(element)) {
                                        this._addInstance(element, new controller(element, this._dataObserver, this._elementBuilder));
                                    }
                                }

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function _bindController(_x3, _x4) {
                return _ref.apply(this, arguments);
            }

            return _bindController;
        }()
    }, {
        key: '_launchMatchingElements',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(node) {
                var _this = this;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                this._eachModule(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(signature) {
                                        var i, l, elements, matchingRootElement;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        for (i = 0, l = _this._modules.length; i < l; i++) {
                                                            elements = Array.from(node.querySelectorAll(signature.selector));
                                                            matchingRootElement = node.matches(signature.selector);


                                                            if (matchingRootElement) {
                                                                elements = [node];
                                                            }

                                                            _this._bindController(elements, signature);
                                                        }

                                                    case 1:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this);
                                    }));

                                    return function (_x6) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());

                            case 1:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function _launchMatchingElements(_x5) {
                return _ref2.apply(this, arguments);
            }

            return _launchMatchingElements;
        }()
    }, {
        key: '_bootstrap',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var _this2 = this;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:

                                this._eachModule(function () {
                                    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(signature) {
                                        var elements;
                                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                            while (1) {
                                                switch (_context4.prev = _context4.next) {
                                                    case 0:
                                                        elements = Array.from(document.querySelectorAll(signature.selector));

                                                        _this2._bindController(elements, signature);

                                                    case 2:
                                                    case 'end':
                                                        return _context4.stop();
                                                }
                                            }
                                        }, _callee4, _this2);
                                    }));

                                    return function (_x7) {
                                        return _ref5.apply(this, arguments);
                                    };
                                }());

                            case 1:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function _bootstrap() {
                return _ref4.apply(this, arguments);
            }

            return _bootstrap;
        }()
    }, {
        key: 'removedElement',
        value: function removedElement(node) {
            this._destructInstance(node);
        }
    }, {
        key: '_observeDomMutation',
        value: function _observeDomMutation(mutations) {
            var _this3 = this;

            for (var i = 0, l = mutations.length; i < l; i++) {
                var mutation = mutations[i];

                switch (mutation.type) {
                    case 'childList':
                        Array.from(mutation.addedNodes).forEach(function (node) {
                            if (typeof node.querySelectorAll === 'function') {
                                _this3._launchMatchingElements(node);
                            }
                        });
                        Array.from(mutation.removedNodes).forEach(function (node) {
                            if (typeof node.querySelectorAll === 'function') {
                                _this3.removedElement(node);
                            }
                        });
                        break;
                    default:
                        throw new Error('Unsupported Mutation Type ' + mutation.type);
                }
            }
        }
    }, {
        key: '_addStyles',
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(name, importer) {
                var styles, styleElement;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                this._stylesLoaded.add(name);

                                if (!(typeof importer === 'function')) {
                                    _context6.next = 8;
                                    break;
                                }

                                _context6.next = 4;
                                return importer();

                            case 4:
                                styles = _context6.sent;
                                styleElement = document.createElement('style');

                                styleElement.innerText = styles.toString();
                                document.head.appendChild(styleElement);

                            case 8:
                                return _context6.abrupt('return', this);

                            case 9:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function _addStyles(_x8, _x9) {
                return _ref6.apply(this, arguments);
            }

            return _addStyles;
        }()
    }]);

    return ModuleLauncher;
}();

exports.ModuleLauncher = ModuleLauncher;