+++
title = "Controller"
description = "Control the DOM element"
weight = 5

type = "documentation"
+++

## Controller

In the controller your application can work with the loaded elements.

A controller can be any class or function. For each matching DOM element **appears in the Viewport** a new instance of your given controller will be created.

Nevertheless you have fully flexibility, we encourage you to use the class syntax and extend a ControllerAbstract given from `gluebert/controller`.


### Syntax

```javascript
import { ControllerAbstract } from 'gluebert/controller';

class YourController extends ControllerAbstract {

    constructor(element = null, data, elements) {
        super(element, data, elements); // important
        
        /**
        
        From the ControllerAbstract,
        the following proberties will be available
        
        // DOM Element Reference
        this._element; 
        
        // DataObserver instance to subscribe, unsubscribe and pushTo Data-Pools
        this._data; 
        
        // ElementBuilder instance where you can create on the fly elements available
        this._elements;
        
        */
    }
}

export {
    YourController,
}
```

## Parameters

A controller instance will be created with the following parameters passed in:

| Name | Description | Accessible by | Type |
| --- | --- | --- | --- |
| element | actual DOM Element Reference | `this._element` | HTMLElement |
| data |  [DataObserver instance](/getting-started/data) to subscribe, unsubscribe and pushTo Data-Pools | `this._data` | DataObserver |
| elements |  [ElementBuilder(/getting-started/elements) instance where you can create on the fly elements available | `this._elements` | ElementBuilder |

---

## Methods

If you use the ControllerAbstract, the following methods are created for you, but can, and should be overridden when necessary.

### .destruct()

This method will be called by gluebert, whenever an element will be removed from DOM.

Time to unsubscribe from Data-Pools, or let the colleagues know that this element is gone, or whatever you want to do :-)

Example:

```javascript
/**
 * Callback when HTMLElement removed from DOM
 */
destruct() {
    this._data.unsubscribe(this);
}
```

## Examples

Following there are a few controllers to give you a better picture about controllers.

### Lazy Load Images

```javascript
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
```

### A controller that listens and push to DataObservers and create elements on the fly

```javascript
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

}

export {
    BallMachineController,
};
```

---


## References and Examples

| What | Where |
| --- | --- |
| [API Reference](https://api.gluebert.com/ControllerAbstract.html) | [api.gluebert.com/ControllerAbstract.html](https://api.gluebert.com/ControllerAbstract.html) |
| [Example Module Folder](https://github.com/wildhaber/gluebert/tree/develop/documentation/themes/gluebert/src/js/modules/lazy-img) | [github.com/wildhaber/gluebert/~/modules/lazy-img](https://github.com/wildhaber/gluebert/tree/develop/documentation/themes/gluebert/src/js/modules/lazy-img) |
| [Example Controller](https://github.com/wildhaber/gluebert/blob/develop/documentation/themes/gluebert/src/js/modules/lazy-img/lazy-img.controller.js) | [github.com/wildhaber/gluebert/~/modules/lazy-img/lazy-img.controller.js](https://github.com/wildhaber/gluebert/blob/develop/documentation/themes/gluebert/src/js/modules/lazy-img/lazy-img.controller.js) |
