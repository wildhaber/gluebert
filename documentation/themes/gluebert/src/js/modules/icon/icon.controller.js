import { ControllerAbstract } from 'gluebert/controller';

/**
 * Class represents IconController
 * @extends ControllerAbstract
 */
class IconController extends ControllerAbstract {

    /**
     * creates a new IconController instance
     * @param {HTMLElement} element
     * @param {DataObserver} data
     * @param {ElementBuilder} elements
     */
    constructor(element = null, data, elements) {
        super(element, data, elements);
        console.log('Icon?', element);
    }

    /**
     * Callback when HTMLElement removed from DOM
     */
    destruct() {
        this._data.unsubscribe(this);
    }
}

export {
    IconController,
};