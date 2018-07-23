import { DependencyManager } from './module.dependency';

/**
 * Class representing ModuleSignature
 */
class ModuleSignature {

    /**
     * creates new ModuleSignature object
     * @param {string} name - Module name
     * @param {string|null} selector
     */
    constructor(name, selector = null) {
        this.validateName(name);
        this.validateSelector(selector);

        this.name = name;
        this.selector = selector;

        this.importController = null;
        this.importStyles = null;
        this.elements = new Set();
        this.isLazy = true;

        this.dependencyManager = new DependencyManager();
    }

    /**
     * validate given name for module signature
     * @return {boolean}
     */
    validateName(name) {
        if (typeof name !== `string`) {
            throw new Error(`Signature name must be string. Given ${name} (${typeof name})`);
        }

        return true;
    }

    /**
     * validate given selector
     * @param selector
     * @return {boolean}
     */
    validateSelector(selector) {
        if (selector !== null && typeof selector !== `string`) {
            throw new Error(`Signature selector must be css selector as string. Given ${selector} (${typeof selector})`);
        }

        return true;
    }

    /**
     * validate given controller
     * @param controller
     * @return {boolean}
     */
    validateController(controller) {
        if (typeof controller !== 'function') {
            throw new Error(`
                Signature controller must be a function returning a promise.
                Given ${controller} (${typeof controller})
                `);
        }

        return true;
    }

    /**
     * validate given import styles
     * @param styles
     * @return {boolean}
     */
    validateImportStyles(styles) {
        if (typeof styles !== 'function') {
            throw new Error(`
                Signature styles must be a function returning a promise.
                Given ${styles} (${typeof styles})
                `);
        }

        return true;
    }

    /**
     * set controller selector
     * @param {string} selector - selector for document.querySelectorAll()
     * @example new ModuleSignature('example').setSelector('.example-class-selector')
     * @return {ModuleSignature}
     */
    setSelector(selector = null) {
        this.validateSelector(selector);
        this.selector = selector;

        return this;
    }

    /**
     * get defined selector
     * @return {string|null}
     */
    getSelector() {
        return this.selector;
    }

    /**
     * set controller import
     * @param {function} controller
     * @example
     * new ModuleSignature('example')
     *  .setImportController(() => import('./example.controller'));
     * @return {AbstractController}
     */
    setImportController(controller = null) {
        this.validateController(controller);
        this.importController = controller;

        return this;
    }

    /**
     * get controller import method
     * @return {function|null}
     */
    getImportController() {
        return this.importController;
    }

    /**
     * set styles import
     * @param {function} styles
     * @return {ModuleSignature}
     */
    setImportStyles(styles = null) {
        this.validateImportStyles(styles);
        this.importStyles = styles;

        return this;
    }

    /**
     * get styles import method
     * @return {function|null}
     */
    getImportStyles() {
        return this.importStyles;
    }

    /**
     * add element signature
     * @param {ElementSignature} elementSignature
     * @return {ModuleSignature}
     */
    addElementSignature(elementSignature) {
        this.elements.add(elementSignature);
        return this;
    }

    /**
     * get elements signatures
     * @return {Set} - set of ElementSignature
     */
    getElementSignatures() {
        return this.elements;
    }

    /**
     * add dependencies
     * @param {string} key
     * @param {function} module
     * @return {ModuleSignature}
     */
    addDependency(key, module) {
        this.dependencyManager.add(key, module);
        return this;
    }

    /**
     * loads this module at the start
     * and does not wait until the intersection
     * observer found the element
     *
     * @return {ModuleSignature}
     */
    disableLazy() {
        this.isLazy = false;
        return this;
    }
}

export { ModuleSignature };