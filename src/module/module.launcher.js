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

        this._intersectionObserver = new IntersectionObserver(
            this._wokeUpElements.bind(this),
            {
                root: null,
                rootMargin: '0px',
                thresholds: [1.0],
            },
        );

        this._instanceMap = new Map();
        this._sleepersMap = new Map();
        this._stylesLoaded = new Set();
        this._batchStyles = [];
        this._batchStylesBusy = false;
        this._lockedNodeSet = new Set();

        if(modules.length) {
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
     * register observer
     * @param {Element} element
     * @param {object} options
     */
    registerObserver(element, options) {
        let _options = Object.assign({
            attributes: false,
            childList: true,
            characterData: false,
            subtree: true,
        }, options);

        this._observer.observe(
            element,
            _options,
        );
    }

    /**
     * module iterator for each module
     * @param {function|null} callback
     * @private
     */
    _eachModule(callback = null) {
        if(typeof callback === 'function') {
            for(let i = 0, l = this._modules.length; i < l; i++) {
                callback(this._modules[i]);
            }
        }
    }

    /**
     * iterator for each element from a nodes list
     * @param {NodeList} nodesList
     * @param {function} callback
     * @private
     */
    _eachElement(nodesList, callback = null) {
        if(
            nodesList &&
            callback
        ) {
            Array.from(nodesList).forEach((node) => {
                if(typeof node.querySelectorAll === 'function') {
                    callback(node);
                }
            });
        }
    }

    /**
     * register a controller instance to element
     * @param {Element} element
     * @param {function} instance - controller instance
     * @private
     */
    _addInstance(element, instance) {
        this._instanceMap.set(element, instance);
    }

    /**
     * call instance destruct
     * @param {Element} element
     * @private
     */
    _destructInstance(element) {
        const instance = this._instanceMap.get(element);
        if(instance) {
            if(typeof instance.destruct === 'function') {
                instance.destruct();
            }
            this._instanceMap.delete(element);
        }
    }

    /**
     * bind controllers from signatures
     * @param {Element} element
     * @param {ModuleSignature} signature
     * @return {Promise.<void>}
     * @private
     */
    async _bindController(element, signature) {

        if(element) {

            const controller = (typeof signature.importController === 'function')
                ? await signature.importController()
                : null;

            const dependencies = await signature.dependencyManager.resolve();

            if(
                controller &&
                dependencies
            ) {
                if(!this._instanceMap.has(element)) {
                    window.requestAnimationFrame(() => {
                        this._addInstance(
                            element,
                            new controller(
                                element,
                                this._dataObserver,
                                this._elementBuilder,
                                dependencies,
                            ),
                        );
                    });
                }
            }

            if(
                !this._stylesLoaded.has(signature.name) &&
                typeof signature.importStyles === 'function'
            ) {
                this._addStyles(signature.name, signature.importStyles);
            }

        }

    }

    /**
     * callback when intersection observer
     * added some entries
     * @param {array}  entries
     * @param {Observer} observer
     * @private
     */
    _wokeUpElements(entries, observer) {
        entries.filter((entry) => {
            return entry.isIntersecting;
        }).forEach((entry) => {

            if(this._sleepersMap.has(entry.target)) {
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
        elements.forEach((element) => {
            if(!(element instanceof Element)) {
                return;
            }

            if(this._intersectionObserver) {
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
    async _launchMatchingElements(node) {
        this._lockedNodeSet.add(node);

        this._eachModule(async (signature) => {
            for(let i = 0, l = this._modules.length; i < l; i++) {

                const element = (typeof node.matches === 'function')
                    ? node.matches(signature.selector)
                    : null;

                if(element) {
                    this._addAsSleeper([element], signature);
                }

            }
        });
    }

    /**
     * bootstrap module instance iterator
     * @return {Promise.<void>}
     * @private
     */
    async _bootstrap() {

        this._eachModule(
            async (signature) => {
                const elements = Array.from(document.querySelectorAll(signature.selector));
                if(elements.length) {
                    this._addAsSleeper(elements, signature);
                }
            },
        );

    }

    /**
     * handle removed item
     * @param {Element} node
     */
    removedElement(node) {
        this._destructInstance(node);
    }

    /**
     * add observe DOM changes
     * @param {NodeList} mutations
     * @private
     */
    _observeDomMutation(mutations) {
        for(let i = 0, l = mutations.length; i < l; i++) {
            const mutation = mutations[i];

            switch (mutation.type) {
                case 'childList':

                    Array.from(new Set(mutation.addedNodes))
                        .filter((node) => !this._lockedNodeSet.has(node) && typeof node.querySelectorAll === 'function')
                        .forEach((node) => this._launchMatchingElements(node));

                    Array.from(new Set(mutation.removedNodes))
                        .filter((node) => typeof node.querySelectorAll === 'function')
                        .forEach((node) => this.removedElement(node));

                    break;
                default:
                    throw new Error(`Unsupported Mutation Type ${mutation.type}`);
            }
        }
    }

    /**
     * extract and add stylesheet
     * @param {string} name
     * @param {function} importer
     * @return {Promise.<ModuleLauncher>}
     * @private
     */
    async _addStyles(name, importer) {
        this._stylesLoaded.add(name);

        if(typeof importer === 'function') {

            const styles = await importer();
            const styleElement = document.createElement('style');

            styleElement.type = 'text/css';

            if(styleElement.styleSheet) {
                styleElement.styleSheet.cssText = styles;
            } else {
                styleElement.appendChild(
                    document.createTextNode(styles),
                );
            }

            this._batchStyles.push(styleElement);

            if(!this._batchStylesBusy) {
                this._batchPaint();
            }

        }

        return this;
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


            for(let i = 0, l = tmpStyles.length; i < l; i++) {
                fragment.appendChild(tmpStyles[i]);
            }

            window.requestAnimationFrame(() => {
                document.head.appendChild(fragment);
            });

        }, 100);
    }


}

export {
    ModuleLauncher,
};
