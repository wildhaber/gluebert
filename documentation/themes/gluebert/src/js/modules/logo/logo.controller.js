import { ControllerAbstract } from 'gluebert/controller';

/**
 * Class represents LogoController
 * @extends ControllerAbstract
 */
class LogoController extends ControllerAbstract {

    /**
     * creates a new LogoController instance
     * @param {HTMLElement} element
     * @param {DataObserver} data
     * @param {ElementBuilder} elements
     */
    constructor(element = null, data, elements) {
        super(element, data, elements);
        console.log('logo?', element);
    }

    /**
     * Callback when HTMLElement removed from DOM
     */
    destruct() {
        this._data.unsubscribe(this);
    }
}

export {
    LogoController,
};