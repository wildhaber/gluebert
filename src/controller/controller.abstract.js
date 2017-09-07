/**
 * Class represents ControllerAbstract
 * @abstract
 */
class ControllerAbstract {

    /**
     * Create a new ControllerAbstract instance
     * @param {HTMLElement} element
     * @param {DataObserver} data
     * @param {ElementBuilder} elements
     */
    constructor(element, data, elements) {
        this._element = element;
        this._data = data;
        this._elements = elements;

        let elementReadyClass = (
            typeof elements === `object` &&
            typeof elements.getElementReadyClass === 'function'
        )
            ? elements.getElementReadyClass()
            : null;

        if(elementReadyClass) {
            this._element.classList.add(elementReadyClass);
        }
    }

    /**
     * Callback when HTMLElement removed from DOM
     */
    destruct() {
        throw new Error('Controllers must provide a .destruct()-Method, fired, when HTMLElement is removed from DOM');
    }
}

export {
    ControllerAbstract,
};