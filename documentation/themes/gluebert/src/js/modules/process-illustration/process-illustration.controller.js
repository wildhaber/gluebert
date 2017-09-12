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
        this._networkElement = this._element.querySelector('.network-payload');
        this._modulesElement = this._element.querySelector('.gluebert-modules');
        this._animation = null;

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
        this._animation = this._anime.timeline()
            .add({
                targets: this._pageElement,
                translateY: 0,
                delay: 400,
                duration: 400,
                elasticity: 0,
            })
            .add({
                targets: this._pageElement,
                translateY: -325,
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

        window.setTimeout(() => {
            this._restart();
        }, 20000);

    }

    _restart() {
        if(this._animation) {
            this._pageElement.classList.remove('running');
            Array.from(this._networkElement.querySelectorAll('.request'))
                .forEach((el) => {
                    el.classList.remove('running');
                    el.classList.remove('done');
                });


            Array.from(this._pageElement.querySelectorAll(`.component`))
                .forEach((el) => el.classList.remove('loaded'));

            this._animate();

        }
    }

    _activationTimeline() {
        this._activateAfter('html', 200)
            ._activateAfter('gluebert', 600)

            ._activateAfter('1', 1600) // navigation
            ._activateAfter('2', 1900) // jumbo
            ._activateAfter('3', 2000) // feature

            ._activateAfter('4', 2200) // teaser
            ._activateAfter('5', 2400) // image
            ._activateAfter('6', 2600) // content
            ._activateAfter('7', 3000) // image-large
            ._activateAfter('8', 3600) // thumbnail
            ._activateAfter('9', 4000) // teaser (only module)
        ;

        // Release start loading
        window.setTimeout(() => {
            this._pageElement.classList.add('running');
        }, 400);

    }

    _activateAfter(group, delay) {

        this._activateNetwork(group, delay);

        window.setTimeout(() => {
            Array.from(this._pageElement.querySelectorAll(`.load-${group}`))
                .forEach((el) => el.classList.add('loaded'));
        }, delay);

        return this;
    }

    _activateNetwork(group, delay) {
        window.setTimeout(() => {
            Array.from(this._networkElement.querySelectorAll(`.load-${group}`))
                .forEach((el) => {
                    el.classList.add('running');

                    // // I know this is bad practice. Needs to be done in css... hopefully somewhen
                    // if(typeof el.dataset.moduleReady === 'string') {
                    //     this._startLoadingModule(el.dataset.moduleReady);
                    // }

                    // I know this is bad practice. Needs to be done in css... hopefully somewhen
                    window.setTimeout(() => {
                        el.classList.add('done');

                        // // I know this is bad practice. Needs to be done in css... hopefully somewhen
                        // if(typeof el.dataset.moduleReady === 'string') {
                        //     this._activateModule(el.dataset.moduleReady);
                        // }

                    }, parseInt(el.dataset.speed));

                });


        }, delay);

        return this;
    }

    _activateModule(module) {
        const el = this._modulesElement.querySelector(`[data-module='${module}']`);
        if(el) {
            el.classList.add('loaded');
        }
    }

    _startLoadingModule(module) {
        const el = this._modulesElement.querySelector(`[data-module='${module}']`);
        if(el) {
            el.classList.add('loading');
        }
    }

}

export {
    ProcessIllustrationController,
};