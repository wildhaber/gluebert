import { ControllerAbstract } from 'gluebert/controller';

/**
 * Class represents SlideController
 * @extends ControllerAbstract
 */
class SlideController extends ControllerAbstract {

    /**
     * creates a new SlideController instance
     * @param {HTMLElement} element
     * @param {DataObserver} data
     * @param {ElementBuilder} elements
     */
    constructor(element = null, data, elements) {
        super(element, data, elements);
        console.log('slide?', element);
    }

    /**
     * Callback when HTMLElement removed from DOM
     */
    destruct() {
        this._data.unsubscribe(this);
    }
}

export {
    SlideController,
};