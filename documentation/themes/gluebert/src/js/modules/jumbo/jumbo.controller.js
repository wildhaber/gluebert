import { ControllerAbstract } from 'gluebert/controller';

/**
 * Class represents JumboController
 * @extends ControllerAbstract
 */
class JumboController extends ControllerAbstract {

    /**
     * creates a new JumboController instance
     * @param {HTMLElement} element
     * @param {DataObserver} data
     * @param {ElementBuilder} elements
     */
    constructor(element = null, data, elements) {
        super(element, data, elements);
        console.log('jumbo?', element);
    }

    /**
     * Callback when HTMLElement removed from DOM
     */
    destruct() {
        this._data.unsubscribe(this);
    }
}

export {
    JumboController,
};