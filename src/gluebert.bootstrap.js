import { ModuleLauncher } from './module/module.launcher';
import { DataObserver } from './data/data.observer';
import { DataManager } from './data/data.manager';
import { ElementBuilder } from './element/element.builder';

const DEFAULT_OPTIONS = {
    elementReadyClass: `gb-ready`,
};

/**
 * Class represents Gluebert
 */
class Gluebert {

    /**
     * @param {ModuleSignature[]} modules
     * @param {DataSignature[]} data
     * @param {object} options
     */
    constructor(modules, data = [], options = {}) {

        this._options = Object.assign(
            {},
            DEFAULT_OPTIONS,
            options,
        );

        this._modules = (modules instanceof Array) ? modules : null;
        this._elements = (this._modules) ? this._extractElements(modules) : null;
        this._data = (data instanceof Array) ? data : null;
        this._schemaValidator = null;
        this._templateEngine = null;
    }

    async start() {

        const polyfills = await this._polyfill();
        this._init();

        return this;
    }

    _polyfill() {
        return import('./polyfills/polyfill.service');
    }

    /**
     * start binding methods and properties
     * @private
     */
    _init() {

        this.elementBuilder = new ElementBuilder(
            this._elements,
            this._templateEngine,
            this._schemaValidator,
            this._options,
        );

        this.dataObserver = new DataObserver();

        this.dataManager = new DataManager(this.dataObserver, this._data);

        this.moduleLauncher = new ModuleLauncher(
            this._modules,
            this.dataObserver,
            this.elementBuilder,
        );
    }

    /**
     * extract elements list from modules
     * @param {ModuleSignature[]} modules
     * @return {ElementSignature[]}
     * @private
     */
    _extractElements(modules) {

        return modules.reduce((a, b) => {
            let elements = b.getElementSignatures();
            if(elements.size) {
                a.push(...elements);
            }
            return a;
        }, []);
    }

    /**
     * set JSON Schema validator Gluebert uses for elements
     * @param schemaValidator
     * @return {Gluebert}
     */
    setSchemaValidator(schemaValidator) {
        this._schemaValidator = (typeof schemaValidator === 'function') ? schemaValidator : null;
        return this;
    }

    /**
     * set template engine
     * @param templateEngine
     * @return {Gluebert}
     */
    setTemplateEngine(templateEngine) {
        this._templateEngine = (
            templateEngine &&
            typeof templateEngine === 'object'
        )
            ? templateEngine
            : null;

        return this;
    }


}

export {
    Gluebert,
};