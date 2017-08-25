import {Message} from './../../../../../../message';
import {ControllerAbstract} from './../../../../../../controller';

/**
 * Class represents BallStatisticsController
 * @extends ControllerAbstract
 */
class BallStatisticsController extends ControllerAbstract {

    /**
     * creates a new BallStatisticsController instance
     * @param {HTMLElement} element
     * @param {DataObserver} data
     * @param {ElementBuilder} elements
     */
    constructor(element = null, data, elements) {
        super(element, data, elements);

        this._max = 42;
        this._ticklist = (element)
            ? element.querySelector('.c-ball-statistics__list')
            : null;

        if(this._ticklist) {
            this._init();
        }
    }

    _init() {
        this._createTicklistElement();
        this._subscribeToBalls();
    }

    async _createTicklistElement() {
        const element = await this._elements.create('ball.statistics.tick.element', {
            max: this._max,
        });

        if(element) {
            this._ticklist.appendChild(element);
        }
    }

    _getCurrentNumber(number) {
        return (this._ticklist)
            ? this._ticklist.querySelector(`[data-ball-statistics-tick-number='${number}']`)
            : null;
    }

    _plusNumber(number) {
        const currentNumberElement = this._getCurrentNumber(number.number);
        const numberCounterBar = (currentNumberElement) ? currentNumberElement.querySelector(`.c-ball-statistics__counter-bar`) : null;
        let updateAll = false;

        if(parseInt(this._ticklist.dataset.max) !== number.max) {
            this._ticklist.dataset.max = number.max;
            updateAll = true;
        }

        window.requestAnimationFrame(() => {
            numberCounterBar.dataset.value = number.counter;
            if(updateAll) {
                this._updateBars();
            } else {
                this._updateBar(numberCounterBar, number.max);
            }
        });

    }

    _updateBar(bar, max) {
        const leaderClass = `c-ball-statistics__counter-bar--leader`;
        const val = parseInt(bar.dataset.value);
        const pc = (val)
            ? Math.round(val / max * 100)
            : 0;
        window.requestAnimationFrame(() => {
            bar.style.height = `${pc}%`;

            if(pc === 100) {
                bar.classList.add(leaderClass)
            } else if(bar.classList.contains(leaderClass)) {
                bar.classList.remove(leaderClass)
            }

        });
    }

    _updateBars() {
        const max = parseInt(this._ticklist.dataset.max);
        const bars = Array.from(this._ticklist.querySelectorAll(`.c-ball-statistics__counter-bar`));

        bars.forEach((bar) => {
            this._updateBar(bar, max);
        });
    }

    _subscribeToBalls() {
        this._data.subscribe(
            this,
            'balls.data',
            {
                add: this._plusNumber.bind(this),
            },
            () => {},
            () => {}
        )
    }

}

export {
    BallStatisticsController,
}