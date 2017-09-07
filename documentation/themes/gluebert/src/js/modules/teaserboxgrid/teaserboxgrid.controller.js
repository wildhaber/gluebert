import { ControllerAbstract } from 'gluebert/controller';

/**
 * Class represents TeaserboxgridController
 * @extends ControllerAbstract
 */
class TeaserboxgridController extends ControllerAbstract {

    /**
     * creates a new TeaserboxgridController instance
     * @param {HTMLElement} element
     * @param {DataObserver} data
     * @param {ElementBuilder} elements
     */
    constructor(element = null, data, elements) {
        super(element, data, elements);
        console.log('Taserboxgrid?', element);
    }

    /**
     * Callback when HTMLElement removed from DOM
     */
    destruct() {
        this._data.unsubscribe(this);
    }
}

export {
    TeaserboxgridController,
};