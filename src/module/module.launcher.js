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

        this._instanceMap = new Map();
        this._stylesLoaded = new Set();

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
     * @param {Element} elements
     * @param {ModuleSignature} signature
     * @return {Promise.<void>}
     * @private
     */
    async _bindController(elements, signature) {

        if(elements.length) {
            const controller = await signature.importController();

            if(!this._stylesLoaded.has(signature.name)) {
                this._addStyles(signature.name, signature.importStyles);
            }

            for(let i = 0, l = elements.length; i < l; i++) {
                const element = elements[i];
                if(!this._instanceMap.has(element)) {
                    this._addInstance(element, new controller(element, this._dataObserver, this._elementBuilder));
                }
            }
        }

    }

    /**
     * launch matching elements
     * @param {Element} node
     * @return {Promise.<void>}
     * @private
     */
    async _launchMatchingElements(node) {
        this._eachModule(async (signature) => {
            for(let i = 0, l = this._modules.length; i < l; i++) {
                let elements = Array.from(node.querySelectorAll(signature.selector));
                const matchingRootElement = (typeof node.matches === 'function')
                    ? node.matches(signature.selector)
                    : null;

                if(matchingRootElement) {
                    elements = [node];
                }

                this._bindController(elements, signature);

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
                this._bindController(elements, signature);
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
                    this._eachElement(mutation.addedNodes, (node) => {
                        this._launchMatchingElements(node);
                    });
                    this._eachElement(mutation.removedNodes, (node) => {
                        this.removedElement(node);
                    });
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

            document.head.appendChild(styleElement);
        }

        return this;
    }

}

export {
    ModuleLauncher,
};
