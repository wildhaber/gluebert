import { Message } from 'gluebert/message';
import { ControllerAbstract } from 'gluebert/controller';

/**
 * Class represents BallMachineController
 * @extends ControllerAbstract
 */
class BallMachineController extends ControllerAbstract {

    /**
     * creates a new BallMachineController instance
     * @param {HTMLElement} element
     * @param {DataObserver} data
     * @param {ElementBuilder} elements
     */
    constructor(element = null, data, elements) {
        super(element, data, elements);

        this._maxBallSize = 42;
        this._ballsLimit = 10;

        this._currentBalls = new Set();
        this._ballsStats = {};
        this._ballsStatsMax = 0;

        this._ballAddTriggerElement = null;

        this._dataKeyBalls = 'balls.data';

        // Initialize Module Component
        this._init();
    }

    /**
     * Initialize Element
     * @returns {BallMachineController}
     * @private
     */
    _init() {
        this._ballAddTriggerElement = (this._element) ? this._element.querySelector('[data-add-ball]') : null;
        this._bindEvents();
        return this;
    }

    /**
     * bind DOM events to element
     * @returns {BallMachineController}
     * @private
     */
    _bindEvents() {
        this._bindAddBallEvent();
        return this;
    }

    /**
     * bind DOM events for adding a new ball
     * @returns {BallMachineController}
     * @private
     */
    _bindAddBallEvent() {
        this._ballAddTriggerElement.addEventListener(
            `click`,
            this._addNewBall.bind(this),
        );
        return this;
    }

    _updateStatsAdd(number) {
        if(typeof this._ballsStats[number] !== 'number') {
            this._ballsStats[number] = 0;
        }

        this._ballsStats[number]++;

        if(this._ballsStats[number] > this._ballsStatsMax) {
            this._ballsStatsMax = this._ballsStats[number];
        }

        return this._ballsStats[number];
    }

    /**
     * Toggle new balls events
     * @returns {BallMachineController}
     * @private
     */
    _addNewBall() {

        if(this._currentBalls.size === this._ballsLimit) {
            this._resetBalls();
        } else {
            const number = this._getUniqueBall();
            const counter = this._updateStatsAdd(number);

            this._data.pushTo(
                this._dataKeyBalls,
                new Message(
                    'add',
                    {
                        number,
                        counter,
                        max: this._ballsStatsMax,
                    },
                ),
            );

            this._currentBalls.add(number);
        }


        return this;
    }

    /**
     * send balls reset event
     * @returns {BallMachineController}
     * @private
     */
    _resetBalls() {
        this._data.pushTo(
            this._dataKeyBalls,
            new Message('reset'),
        );

        this._currentBalls.clear();
        return this;
    }

    /**
     * get a unique ball number
     * @returns {number}
     * @private
     */
    _getUniqueBall() {
        const number = Math.ceil(Math.random() * this._maxBallSize);
        return (!this._currentBalls.has(number)) ? number : this._getUniqueBall();
    }

    /**
     * Callback when HTMLElement removed from DOM
     */
    destruct() {
    }
}

export {
    BallMachineController,
};