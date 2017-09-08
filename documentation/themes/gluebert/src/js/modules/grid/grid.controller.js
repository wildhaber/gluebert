import { ControllerAbstract } from 'gluebert/controller';

/**
 * Class represents GridController
 * @extends ControllerAbstract
 */
class GridController extends ControllerAbstract {

    /**
     * creates a new GridController instance
     * @param {HTMLElement} element
     * @param {DataObserver} data
     * @param {ElementBuilder} elements
     */
    constructor(element = null, data, elements) {
        super(element, data, elements);
        console.log('Grid?', element);
    }

    /**
     * Callback when HTMLElement removed from DOM
     */
    destruct() {
        this._data.unsubscribe(this);
    }
}

export {
    GridController,
};