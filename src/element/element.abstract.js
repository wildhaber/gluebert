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
    constructor(data = null, template = null) {
        this._data = data;
        this._template = (template instanceof DocumentFragment || template instanceof Element)
            ? template
            : null;
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

        if(!this._template) {
            return null;
        }

        this.bindData();
        return document.importNode(this._template, true);

    }

}

export {
    ElementAbstract,
};