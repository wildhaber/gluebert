import { ControllerAbstract } from 'gluebert/controller';

/**
 * Class represents BallBucketController
 * @extends ControllerAbstract
 */
class BallBucketController extends ControllerAbstract {

    /**
     * creates a new BallBucket instance
     * @param {HTMLElement} element
     * @param {DataObserver} data
     * @param {ElementBuilder} elements
     */
    constructor(element = null, data, elements) {
        super(element, data, elements);

        this._ballsListElement = (this._element) ? this._element.querySelector('.balls') : null;

        this._dataKeyBalls = 'balls.data';

        this._numberFilterKey = (typeof this._element.dataset.numberFilter === 'string')
            ? this._element.dataset.numberFilter
            : null;

        // Initialize Module Component
        this._init();
    }

    /**
     * Initialize Element
     * @returns {BallBucketController}
     * @private
     */
    _init() {
        this._subscribeBallBucketData();
        this._bindEvents();
        return this;
    }

    /**
     * bind DOM events to element
     * @returns {BallBucketController}
     * @private
     */
    _bindEvents() {
        return this;
    }

    /**
     * subscribes to AwesomeData observable
     * @returns {BallBucketController}
     * @private
     */
    _subscribeBallBucketData() {
        this._data.subscribe(
            this,
            this._dataKeyBalls,
            {
                add: {
                    fn: this._onAddBallMessage.bind(this),
                    filter: (messageData) => this._isNumberApplicable(messageData.number),
                },
                reset: this._clearBalls.bind(this),
            },
            this._onBallDataError.bind(this),
            this._onBallDataComplete.bind(this),
            null,
        );
        return this;
    }

    /**
     * clears ball selection from DOM
     * @returns {BallBucketController}
     * @private
     */
    _clearBalls() {
        this._ballsListElement.innerHTML = '';
        return this;
    }

    /**
     * create ball element and append to list
     * @param {object} number
     * @returns {BallBucketController}
     * @private
     */
    _createBallElement(number) {
        window.requestAnimationFrame(async () => {
            const el = await this._elements.create('ball.element', {
                number: number.number,
                evenOddClass: () => {
                    switch (number.number % 2) {
                        case 1 :
                            return 'even';
                        case 0 :
                            return 'odd';
                        default :
                            return 'unknown';
                            break;
                    }
                },
            });
            if(el) {
                this._ballsListElement.appendChild(el);
            }
        });
        return this;
    }

    /**
     * checks if number given is applicable
     * on certain filter
     * @param number
     * @return {boolean}
     * @private
     */
    _isNumberApplicable(number) {

        if(!this._numberFilterKey) {
            return true;
        }

        switch (this._numberFilterKey.toLowerCase()) {
            case 'even' :
                return (number % 2 === 0);
                break;
            case 'odd' :
                return (number % 2 === 1);
                break;
            default:
                return true;
                break;
        }
    }

    /**
     * callback on ball add message
     * @param {object|null} messageData
     * @private
     */
    _onAddBallMessage(messageData) {
        this._createBallElement(messageData);
    }

    /**
     * Callback when AwesomeData subscription sends error
     * @param {object} err
     * @private
     */
    _onBallDataError(err) {
        console.log('Ooops, data - error... ', err);
    }

    /**
     * Callback when AwesomeDta subscription queue is complete
     * @private
     */
    _onBallDataComplete() {
        console.log('Awesome data complete. Done. Check.');
    }

    /**
     * Callback when HTMLElement removed from DOM
     */
    destruct() {
        this._data.unsubscribe(this);
    }
}

export {
    BallBucketController,
};