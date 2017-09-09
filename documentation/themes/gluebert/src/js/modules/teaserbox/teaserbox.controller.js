import { ControllerAbstract } from 'gluebert/controller';

/**
 * Class represents TeaserboxController
 * @extends ControllerAbstract
 */
class TeaserboxController extends ControllerAbstract {

    /**
     * creates a new TeaserboxController instance
     * @param {HTMLElement} element
     * @param {DataObserver} data
     * @param {ElementBuilder} elements
     */
    constructor(element = null, data, elements) {
        super(element, data, elements);
    }

    /**
     * Callback when HTMLElement removed from DOM
     */
    destruct() {
        this._data.unsubscribe(this);
    }
}

export {
    TeaserboxController,
};