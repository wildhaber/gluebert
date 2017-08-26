import { ElementAbstract } from './../../../../../../element';

/**
 * Class represents BallStatisticsElement
 * @extends ElementAbstract
 */
class BallStatisticsElement extends ElementAbstract {

    /**
     * Create new BallStatisticsElement
     * @param {object} data
     * @param {HTMLElement} template - shadow dom template reference
     */
    constructor(data, template) {
        super(data, template);
    }

    /**
     * binds data to element context
     */
    bindData() {

    }

}

export {
    BallStatisticsElement,
};