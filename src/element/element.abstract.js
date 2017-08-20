/**
 * Class represents ElementAbstract
 * @abstract
 */
class ElementAbstract {

    /**
     * Create an Element
     * @param {object} data
     * @param {DocumentFragment} template - shadow dom template reference
     */
    constructor(data, template) {
        this._data = data;
        this._template = template;
    }

    /**
     * binds data to given shadow dom node
     */
    bindData() {

    }

    /**
     * creates node
     * @return {Node}
     */
    create() {
        this.bindData();
        return document.importNode(this._template, true);
    }

}

export {
    ElementAbstract,
};