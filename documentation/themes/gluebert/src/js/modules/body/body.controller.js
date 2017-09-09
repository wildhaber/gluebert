import { ControllerAbstract } from 'gluebert/controller';

/**
 * Class represents BodyController
 * @extends ControllerAbstract
 */
class BodyController extends ControllerAbstract {

    /**
     * creates a new BodyController instance
     * @param {HTMLElement} element
     * @param {DataObserver} data
     * @param {ElementBuilder} elements
     */
    constructor(element = null, data, elements) {
        super(element, data, elements);
        console.log('Body?', element);
    }

    /**
     * Callback when HTMLElement removed from DOM
     */
    destruct() {
        this._data.unsubscribe(this);
    }
}

export {
    BodyController,
};