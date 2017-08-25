import {ElementAbstract} from './../../../../../../element';

/**
 * Class represents BallElement
 * @extends ElementAbstract
 */
class BallElement extends ElementAbstract {

    /**
     * Create new BallElement
     * @param {object} data
     * @param {HTMLElement} template - shadow dom template reference
     */
    constructor(data, template) {
        super(data, template);

        this._numberElement = this._template.querySelector('slot');
        this._ballElement = this._template.querySelector('.ball');
        this._number = this._data.number;
    }

    /**
     * binds data to element context
     */
    bindData() {
        if(this._numberElement) {
            this._numberElement.textContent = this._number;
        }

        if(this._ballElement) {
            if(this._number % 2 === 0) {
                this._ballElement.classList.add('even');
            } else {
                this._ballElement.classList.add('odd');
            }
        }
    }

}

export {
    BallElement,
}