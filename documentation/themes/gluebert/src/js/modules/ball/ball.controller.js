import { ControllerAbstract } from 'gluebert/controller';

/**
 * Class represents BallController
 * @extends ModuleAbstract
 */
class BallController extends ControllerAbstract {

    /**
     * creates a new BallController instance
     * @param {HTMLElement} element
     * @param {DataObserver} data
     * @param {ElementBuilder} elements
     */
    constructor(element = null, data, elements) {
        super(element, data, elements);

        // Initialize Module Component
        this._init();
    }

    /**
     * Initialize Element
     * @returns {Ball}
     * @private
     */
    _init() {
        this._bindEvents();
        return this;
    }

    /**
     * bind DOM events to element
     * @returns {Ball}
     * @private
     */
    _bindEvents() {
        return this;
    }

    /**
     * Callback when HTMLElement removed from DOM
     */
    destruct() {
        this._data.unsubscribe(this);
    }
}

export {
    BallController,
};