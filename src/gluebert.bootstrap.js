import {ModuleLauncher} from './module/module.launcher';
import {DataObserver} from './data/data.observer';
import {DataManager} from './data/data.manager';
import {ElementBuilder} from './element/element.builder';

/**
 * Class represents Gluebert
 */
class Gluebert {

    /**
     * @param {ModuleSignature[]} modules
     * @param {DataSignature[]} data
     */
    constructor(modules, data) {

        this._modules = modules;
        this._elements = this._extractElements(modules);
        this._data = data;
        this._schemaValidator = null;
        this._templateEngine = null;

    }

    start() {
        this._init();
        return this;
    }

    /**
     * start binding methods and properties
     * @private
     */
    _init() {
        this.elementBuilder = new ElementBuilder(this._elements, this._templateEngine, this._schemaValidator);
        this.dataObserver = new DataObserver();
        this.dataManager = new DataManager(this.dataObserver, this._data);
        this.moduleLauncher = new ModuleLauncher(this._modules, this.dataObserver, this.elementBuilder);
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
            if (elements.size) {
                a.push(...elements);
            }
            return a;
        }, []);
    }


    setSchemaValidator(schemaValidator) {
        this._schemaValidator = schemaValidator;
        return this;
    }

    setTemplateEngine(templateEngine) {
        this._templateEngine = templateEngine;
        return this;
    }


}

export {
    Gluebert
}