import { ControllerAbstract } from 'gluebert/controller';

/**
 * Class represents ProcessIllustrationController
 * @extends ControllerAbstract
 */
class ProcessIllustrationController extends ControllerAbstract {

    /**
     * creates a new ProcessIllustrationController instance
     * @param {HTMLElement} element
     * @param {DataObserver} data
     * @param {ElementBuilder} elements
     */
    constructor(element = null, data, elements) {
        super(element, data, elements);

        this._anime = null;
        this._pageElement = this._element.querySelector('.page');

        this._init();

    }

    async _loadDependencies() {
        this._anime = await import('animejs');
    }

    _init() {
        this._loadDependencies()
            .then(() => {
                this._animate();
            });
    }

    _animate() {
        this._anime.timeline()
            .add({
                targets: this._pageElement,
                translateY: -20,
                delay: 1000,
                duration: 3000,
                elasticity: 0,
            })
            .add({
                targets: this._pageElement,
                translateY: -200,
                delay: 1000,
                duration: 10000,
                elasticity: 0,
            })
            .add({
                targets: this._pageElement,
                translateY: 0,
                delay: 0,
                duration: 4000,
                elasticity: 0,
            });

        this._activationTimeline();

    }


    _activationTimeline() {
        this._activateAfter('1', 200)
            ._activateAfter('2', 300)
            ._activateAfter('3', 5100)
            ._activateAfter('4', 5700)
            ._activateAfter('5', 6400)
            ._activateAfter('6', 6600)
            ._activateAfter('7', 7200);
    }

    _activateAfter(group, delay) {
        window.setTimeout(() => {
            Array.from(this._pageElement.querySelectorAll(`.load-${group}`))
                .forEach((el) => el.classList.add('loaded'))
        }, delay);

        return this;
    }

}

export {
    ProcessIllustrationController,
};