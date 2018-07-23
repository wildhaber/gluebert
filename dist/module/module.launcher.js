function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Class representing ModuleLauncher
 */
class ModuleLauncher {

    /**
     * Creates instance of ModuleLauncher
     * @param modules
     * @param {DataObserver} dataObserver
     * @param {ElementBuilder} elementBuilder
     * @constructor
     */
    constructor(modules = [], dataObserver, elementBuilder) {

        this._modules = modules;
        this._dataObserver = dataObserver;
        this._elementBuilder = elementBuilder;

        this._observeDomMutation = this._observeDomMutation.bind(this);
        this._observer = new MutationObserver(this._observeDomMutation);
        this._intersectionObserver = this.getIntersectionObserver();

        this._instanceMap = new Map();
        this._signatureElements = {};
        this._sleepersMap = new Map();
        this._stylesLoaded = new Set();
        this._batchStyles = [];
        this._batchStylesBusy = false;
        this._lockedNodeSet = new Set();

        if (modules.length) {
            this._init();
        }
    }

    /**
     * initialize ModuleLoader
     * @private
     */
    _init() {
        this.registerObserver(document.body);
        this._bootstrap();
    }

    /**
     * get intersection observer
     * @return {IntersectionObserver|null}
     */
    getIntersectionObserver() {
        if (typeof IntersectionObserver !== 'function') {
            return null;
        }

        return new IntersectionObserver(this._wokeUpElements.bind(this), {
            root: null,
            rootMargin: '0px',
            thresholds: [1.0]
        });
    }

    /**
     * register observer
     * @param {Element} element
     * @param {object} options
     */
    registerObserver(element, options) {
        let _options = Object.assign({
            attributes: false,
            childList: true,
            characterData: false,
            subtree: true
        }, options);

        this._observer.observe(element, _options);
    }

    /**
     * module iterator for each module
     * @param {function|null} callback
     * @private
     */
    _eachModule(callback = null) {
        if (typeof callback === 'function') {
            for (let i = 0, l = this._modules.length; i < l; i++) {
                callback(this._modules[i]);
            }
        }
    }

    /**
     * call instance destruct
     * @param {Element} element
     * @private
     */
    _destructInstance(element) {
        const instance = this._instanceMap.get(element);
        const signatures = this.getSignaturesByElement(element);

        if (instance) {
            if (typeof instance.destruct === 'function') {
                instance.destruct();
            }
            this._instanceMap.delete(element);
        }

        if (signatures.length) {
            this.removeElementFromSignatureList(element);
            signatures.map(signature => this.cleanupSignatureStyles(signature));
        }
    }

    /**
     * get controller from signature
     * @param signature
     * @return {Promise.<null>}
     */
    getControllerFromSignature(signature) {
        return _asyncToGenerator(function* () {
            return typeof signature.importController === 'function' ? yield signature.importController() : null;
        })();
    }

    /**
     * bind controller instance
     * @param element
     * @param controller
     */
    bindControllerInstance(element, controller, dependencies) {
        window.requestAnimationFrame(() => {
            this._instanceMap.set(element, new controller(element, this._dataObserver, this._elementBuilder, dependencies));
        });
    }

    /**
     * bind controllers from signatures
     * @param {Element} element
     * @param {ModuleSignature} signature
     * @return {Promise.<void>}
     * @private
     */
    _bindController(element, signature) {
        var _this = this;

        return _asyncToGenerator(function* () {
            if (!element || !signature) {
                return null;
            }

            _this.addElementToSignatureList(signature, element);
            _this._updateElementState(element, 'sleeping', 'loading');

            const controller = yield _this.getControllerFromSignature(signature);
            const dependencies = yield signature.dependencyManager.resolve();

            if (controller && !_this._instanceMap.has(element)) {
                _this.bindControllerInstance(element, controller, dependencies);
            }

            if (!_this._stylesLoaded.has(signature.name) && typeof signature.importStyles === 'function') {
                _this._addStyles(element, signature.name, signature.importStyles);
            } else {
                _this._updateElementState(element, 'loading', 'ready');
            }
        })();
    }

    addElementToSignatureList(signature, element) {
        if (typeof this._signatureElements[signature.name] === 'undefined') {
            this._signatureElements[signature.name] = new Set();
        }

        this._signatureElements[signature.name].add(element);

        return this;
    }

    removeElementFromSignatureList(element) {
        const signatures = this.getSignaturesByElement(element);
        signatures.forEach(signature => {
            this._signatureElements[signature].delete(element);
        });

        return this;
    }

    getSignaturesByElement(element) {
        const activeSignatures = Object.keys(this._signatureElements);
        return activeSignatures.filter(signatureKey => {
            return this._signatureElements[signatureKey].has(element);
        });
    }

    cleanupSignatureStyles(signature) {
        const availableElements = this._signatureElements[signature];
        if (!availableElements.size) {
            this.removeStylesForSignature(signature);
        }

        return this;
    }

    /**
     * callback when intersection observer
     * added some entries
     * @param {array}  entries
     * @param {Observer} observer
     * @private
     */
    _wokeUpElements(entries, observer) {

        entries.filter(entry => {
            return typeof entry.isIntersecting === 'boolean' ? entry.isIntersecting : entry.intersectionRatio > 0; // IE Edge Fallback (https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12156111/)
        }).forEach(entry => {
            if (this._sleepersMap.has(entry.target)) {
                let signature = this._sleepersMap.get(entry.target);

                this._bindController(entry.target, signature);

                this._sleepersMap.delete(entry.target);
            }
            observer.unobserve(entry.target);
        });
    }

    /**
     * adding an element when it appears
     * through mutation observer
     * @param {array} elements
     * @param {ModuleSignature} signature
     * @private
     */
    _addAsSleeper(elements, signature) {

        elements.forEach(element => {
            if (!(element instanceof Element)) {
                return;
            }

            if (this._intersectionObserver && signature.isLazy) {
                this._updateElementState(element, null, 'sleeping');
                this._sleepersMap.set(element, signature);
                this._intersectionObserver.observe(element);
            } else {
                this._bindController(element, signature);
            }
        });
        return this;
    }

    /**
     * launch matching elements
     * @param {Element} node
     * @return {Promise.<void>}
     * @private
     */
    _launchMatchingElements(node) {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            _this2._lockedNodeSet.add(node);

            _this2._eachModule((() => {
                var _ref = _asyncToGenerator(function* (signature) {
                    for (let i = 0, l = _this2._modules.length; i < l; i++) {

                        const elementMatches = typeof node.matches === 'function' ? node.matches(signature.selector) : false;

                        if (elementMatches) {
                            _this2._addAsSleeper([node], signature);
                        }
                    }
                });

                return function (_x) {
                    return _ref.apply(this, arguments);
                };
            })());
        })();
    }

    /**
     * bootstrap module instance iterator
     * @return {Promise.<void>}
     * @private
     */
    _bootstrap() {
        var _this3 = this;

        return _asyncToGenerator(function* () {

            _this3._eachModule((() => {
                var _ref2 = _asyncToGenerator(function* (signature) {
                    const elements = Array.from(document.querySelectorAll(signature.selector));
                    if (elements.length) {
                        _this3._addAsSleeper(elements, signature);
                    }
                });

                return function (_x2) {
                    return _ref2.apply(this, arguments);
                };
            })());
        })();
    }

    /**
     * add observe DOM changes
     * @param {NodeList} mutations
     * @private
     */
    _observeDomMutation(mutations) {
        for (let i = 0, l = mutations.length; i < l; i++) {
            const mutation = mutations[i];

            switch (mutation.type) {
                case 'childList':

                    Array.from(new Set(mutation.addedNodes)).filter(node => !this._lockedNodeSet.has(node) && typeof node.querySelectorAll === 'function').forEach(node => this._launchMatchingElements(node));

                    Array.from(new Set(mutation.removedNodes)).filter(node => typeof node.querySelectorAll === 'function').forEach(node => this._destructInstance(node));

                    break;
                default:
                    throw new Error(`Unsupported Mutation Type ${mutation.type}`);
            }
        }
    }

    getStylesId(name) {
        return `gluebert-styles-${name}`;
    }

    /**
     * get style element
     * @param name
     * @param styles
     * @return {Element}
     */
    getStyleElement(name, styles) {
        const styleElement = document.createElement('style');

        styleElement.type = 'text/css';
        styleElement.id = this.getStylesId(name);

        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = styles;
        } else {
            styleElement.appendChild(document.createTextNode(styles));
        }

        return styleElement;
    }

    /**
     * extract and add stylesheet
     * @param {string} name
     * @param {function} importer
     * @return {Promise.<ModuleLauncher>}
     * @private
     */
    _addStyles(element, name, importer) {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            _this4._stylesLoaded.add(name);

            if (typeof importer !== 'function') {
                return _this4;
            }

            const styles = yield importer();
            const styleElement = _this4.getStyleElement(name, styles);

            _this4._batchStyles.push(styleElement);

            if (!_this4._batchStylesBusy) {
                _this4._batchPaint();
            }

            _this4._updateElementState(element, 'loading', 'ready', 120);

            return _this4;
        })();
    }

    /**
     * combine styles to be added
     * to avoid too much repainting
     * @private
     */
    _batchPaint() {
        this._batchStylesBusy = true;

        const fragment = document.createDocumentFragment();

        window.setTimeout(() => {
            let tmpStyles = this._batchStyles;
            this._batchStyles = [];
            this._batchStylesBusy = false;

            for (let i = 0, l = tmpStyles.length; i < l; i++) {
                fragment.appendChild(tmpStyles[i]);
            }

            window.requestAnimationFrame(() => {
                document.head.appendChild(fragment);
            });
        }, 100);
    }

    updateElementStateClass(element, from, to, fromClass, toClass, delay) {

        if (element && typeof element.classList !== 'undefined' && (fromClass || toClass)) {

            if (!delay) {
                window.requestAnimationFrame(() => {
                    if (fromClass) {
                        element.classList.remove(fromClass);
                    }

                    if (toClass) {
                        element.classList.add(toClass);
                    }
                });
            } else {
                window.setTimeout(() => {
                    this._updateElementState(element, from, to);
                }, delay);
            }
        }

        return this;
    }

    getStateClassByKey(key, stateClasses) {
        return key && typeof stateClasses[key.toUpperCase()] === 'string' ? stateClasses[key.toUpperCase()] : null;
    }

    _updateElementState(element, from, to, delay = null) {

        const options = this._elementBuilder.getOptions();

        const stateClasses = {
            SLEEPING: options.elementSleepingClass,
            LOADING: options.elementLoadingClass,
            READY: options.elementReadyClass
        };

        const fromClass = this.getStateClassByKey(from, stateClasses);
        const toClass = this.getStateClassByKey(to, stateClasses);

        return this.updateElementStateClass(element, from, to, fromClass, toClass, delay);
    }

    removeStylesForSignature(signature) {
        const styleElement = document.head.querySelector(`#${this.getStylesId(signature)}`);
        if (styleElement) {
            document.head.removeChild(styleElement);
            this._stylesLoaded.delete(signature);
        }

        return this;
    }

}

export { ModuleLauncher };