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

    _init() {
        this.registerObserver(document.body);
        this._bootstrap();
    }

    registerObserver(element, options) {
        let _options = Object.assign({
            attributes: false,
            childList: true,
            characterData: false,
            subtree: true,
        }, options);

        this._observer.observe(
            element,
            _options
        );
    }

    _eachModule(callback = null) {
        if(typeof callback === 'function') {
            for(let i = 0, l = this._modules.length; i < l; i++) {
                callback(this._modules[i]);
            }
        }
    }

    _addInstance(element, instance) {
        this._instanceMap.set(element, instance);
    }

    _destructInstance(element) {
        const instance = this._instanceMap.get(element);
        if(instance) {
            if(typeof instance.destruct === 'function') {
                instance.destruct();
            }
            this._instanceMap.delete(element);
        }
    }

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

    async _launchMatchingElements(node) {
        this._eachModule(async(signature) => {
            for(let i = 0, l = this._modules.length; i < l; i++) {
                let elements = Array.from(node.querySelectorAll(signature.selector));
                const matchingRootElement = node.matches(signature.selector);

                if(matchingRootElement) {
                    elements = [node];
                }

                this._bindController(elements, signature);

            }
        });
    }

    async _bootstrap() {

        this._eachModule(async(signature) => {
            const elements = Array.from(document.querySelectorAll(signature.selector));
            this._bindController(elements, signature);
        }
        );

    }

    removedElement(node) {
        this._destructInstance(node);
    }

    _observeDomMutation(mutations) {

        for(let i = 0, l = mutations.length; i < l; i++) {
            const mutation = mutations[i];

            switch (mutation.type) {
                case 'childList':
                    Array.from(mutation.addedNodes).forEach((node) => {
                        if(typeof node.querySelectorAll === 'function') {
                            this._launchMatchingElements(node);
                        }
                    });
                    Array.from(mutation.removedNodes).forEach((node) => {
                        if(typeof node.querySelectorAll === 'function') {
                            this.removedElement(node);
                        }
                    });
                    break;
                default:
                    throw new Error(`Unsupported Mutation Type ${mutation.type}`);
            }
        }
    }

    async _addStyles(name, importer) {
        this._stylesLoaded.add(name);
        if(typeof importer === 'function') {
            const styles = await importer();
            const styleElement = document.createElement('style');
            styleElement.innerText = styles.toString();
            document.head.appendChild(styleElement);
        }
        return this;
    }

}

export {
    ModuleLauncher,
};
