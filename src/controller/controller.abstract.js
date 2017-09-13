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
     * @param {DependencyManager} dependencies
     */
    constructor(element, data, elements, dependencies) {
        this._element = element;
        this._data = data;
        this._elements = elements;
        this._dependencies = dependencies || null;

        let elementReadyClass = (
            typeof elements === `object` &&
            typeof elements.getElementReadyClass === 'function'
        )
            ? elements.getElementReadyClass()
            : null;

        if(
            elementReadyClass &&
            this._element &&
            typeof this._element === 'object' &&
            typeof this._element.classList !== 'undefined'
        ) {
            this._element.classList.add(elementReadyClass);
        }

        if(this._dependencies) {
            this._dependencies.inject(this);
        }
    }

    /**
     * Callback when HTMLElement removed from DOM
     */
    destruct() {
        this._data.unsubscribe(this);
    }


}

export {
    ControllerAbstract,
};