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
        this._data = (data)
            ? data
            : null;

        this._template = (template instanceof DocumentFragment)
            ? template
            : (template) ? template : null;
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