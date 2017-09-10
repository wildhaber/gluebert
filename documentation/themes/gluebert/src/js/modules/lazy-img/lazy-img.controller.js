import { ControllerAbstract } from 'gluebert/controller';

/**
 * Class represents LazyImgController
 * @extends ControllerAbstract
 */
class LazyImgController extends ControllerAbstract {

    /**
     * creates a new LazyImgController instance
     * @param {HTMLElement} element
     * @param {DataObserver} data
     * @param {ElementBuilder} elements
     */
    constructor(element = null, data, elements) {
        super(element, data, elements);
        this._src = (typeof element.dataset.src === 'string')
            ? element.dataset.src
            : null;

        if(this._src) {
            this._lazyLoad();
        }
    }

    _lazyLoad() {
        this._element.setAttribute('src', this._src);
        this._element.addEventListener('load', () => {
            this._element.classList.add('loaded');
        });

        this._element.addEventListener('error', () => {
            this._element.parentNode.removeChild(this._element);
        });
    }

}

export {
    LazyImgController,
};