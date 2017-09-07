import { ControllerAbstract } from 'gluebert/controller';

/**
 * Class represents NavigationController
 * @extends ControllerAbstract
 */
class NavigationController extends ControllerAbstract {

    /**
     * creates a new NavigationController instance
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
    NavigationController,
};