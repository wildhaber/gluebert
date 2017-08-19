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
        this.name = name;
        this.selector = selector;
        this.importController = null;
        this.importStyles = null;
        this.elements = new Set();
    }

    /**
     * set controller selector
     * @param {string} selector - selector for document.querySelectorAll()
     * @example new ModuleSignature('example').setSelector('.example-class-selector')
     * @return {ModuleSignature}
     */
    setSelector(selector) {
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
     *  .setModuleImport(() => import('./example.controller'));
     * @return {AbstractController}
     */
    setControllerImport(controller) {
        this.importController = controller;
        return this;
    }

    /**
     * get controller import method
     * @return {function|null}
     */
    getControllerImport() {
        return this.importController;
    }

    /**
     * set styles import
     * @param {function} styles
     * @return {ModuleSignature}
     */
    setStylesImport(styles) {
        this.importStyles = styles;
        return this;
    }

    /**
     * get styles import method
     * @return {function|null}
     */
    getStylesImport() {
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

}

export {
    ModuleSignature,
};