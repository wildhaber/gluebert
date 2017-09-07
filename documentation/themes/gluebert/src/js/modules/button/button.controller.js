import { ControllerAbstract } from 'gluebert/controller';

/**
 * Class represents ButtonController
 * @extends ControllerAbstract
 */
class ButtonController extends ControllerAbstract {

    /**
     * creates a new ButtonController instance
     * @param {HTMLElement} element
     * @param {DataObserver} data
     * @param {ElementBuilder} elements
     */
    constructor(element = null, data, elements) {
        super(element, data, elements);
        console.log('Navigation?', element);
    }

    /**
     * Callback when HTMLElement removed from DOM
     */
    destruct() {
        this._data.unsubscribe(this);
    }
}

export {
    ButtonController,
};