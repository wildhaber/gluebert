'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DataObserver = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _message = require('../message/message.dispatcher');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class represents DataObserver
 */
var DataObserver = function () {

    /**
     * creates new DataObserver instance
     */
    function DataObserver() {
        _classCallCheck(this, DataObserver);

        /**
         * all observables are listed here
         * @type {{}}
         * @private
         */
        this._observables = {};

        /**
         * all registered DataSignatures without being subscribed
         * @type {{}}
         * @private
         */
        this._signatures = {};

        /**
         * Map with active subscriptions
         * @type {Map}
         * @private
         */
        this._subscriptions = new Map();
    }

    /**
     * registers a signature
     * @param {DataSignature} signature
     * @returns {DataObserver}
     */


    _createClass(DataObserver, [{
        key: 'addSignature',
        value: function addSignature(signature) {
            this._signatures[signature.key] = Object.assign({}, signature, { busy: false });
            return this;
        }

        /**
         * remove signature
         * @param {DataSignature} signature
         * @returns {DataObserver}
         */

    }, {
        key: 'removeSignature',
        value: function removeSignature(signature) {
            delete this._signatures[signature.key];
            return this;
        }

        /**
         * get signature by key
         * @param {string} key
         * @returns {DataSignature|null}
         */

    }, {
        key: 'getSignature',
        value: function getSignature(key) {
            return _typeof(this._signatures[key]) === 'object' ? this._signatures[key] : null;
        }

        /**
         * sets busy state to true for a given signature
         * while instanciating. Avoids multi instanciating
         * same DataPool
         * @param {string} key
         * @returns {DataObserver}
         */

    }, {
        key: 'setSignatureBusy',
        value: function setSignatureBusy(key) {
            if (_typeof(this._signatures[key]) === 'object') {
                this._signatures[key].busy = true;
            }
            return this;
        }

        /**
         * checks if signature isBusy
         * @param key
         * @returns {boolean}
         */

    }, {
        key: 'isSignatureBusy',
        value: function isSignatureBusy(key) {
            return _typeof(this._signatures[key]) === 'object' ? this._signatures[key].busy : false;
        }

        /**
         * adds an observable to internalObservable storage
         * @param {string} key
         * @param {DataAbstract} observableModule
         * @returns {DataObserver}
         */

    }, {
        key: 'addObservable',
        value: function addObservable(key, observableModule) {
            if (!key || typeof key !== 'string' || !observableModule || !~['function', 'object'].indexOf(typeof observableModule === 'undefined' ? 'undefined' : _typeof(observableModule))) {
                return this;
            }

            this._observables[key] = {
                observable: observableModule.getObservable(),
                push: typeof observableModule.push === 'function' ? observableModule.push.bind(observableModule) : null
            };

            return this;
        }

        /**
         * deletes an stored observable by key
         * @param {string} key
         * @returns {DataObserver}
         */

    }, {
        key: 'removeObservable',
        value: function removeObservable(key) {
            delete this._observables[key];
            return this;
        }

        /**
         * checks if observable is registered and instanciated by key
         * @param {string} key
         * @returns {boolean}
         * @private
         */

    }, {
        key: '_observableExists',
        value: function _observableExists(key) {
            return !!key && typeof key === 'string' && !!this._observables[key] && _typeof(this._observables[key]) === 'object' && !!this._observables[key].observable && _typeof(this._observables[key].observable) === 'object' && typeof this._observables[key].observable.subscribe === 'function';
        }

        /**
         * checks if signature exists by key
         * @param {string} key
         * @returns {boolean}
         * @private
         */

    }, {
        key: '_signatureExists',
        value: function _signatureExists(key) {
            return _typeof(this._signatures[key]) === 'object';
        }

        /**
         * adds a subscription to the internal
         * subscription storage
         * @param {ModuleAbstract} origin - unique instance of where this subscription is registered from
         * @param {string} key
         * @param {Subscription} subscription - RxJs subscription instance
         * @returns {DataObserver}
         * @private
         */

    }, {
        key: '_addSubscription',
        value: function _addSubscription(origin, key, subscription) {
            if (!this._subscriptions.has(origin)) {
                this._subscriptions.set(origin, new Set());
            }

            var currentSubscriptions = this._subscriptions.get(origin);
            currentSubscriptions.add({
                key: key,
                subscription: subscription
            });

            this._subscriptions.set(origin, currentSubscriptions);

            return this;
        }

        /**
         * get a set of subscriptions by its origin
         * @param {ModuleAbstract} origin
         * @returns {Set}
         */

    }, {
        key: 'getSubscriptions',
        value: function getSubscriptions(origin) {
            return this._subscriptions.get(origin);
        }

        /**
         * get single subscription by its origin and data key
         * @param {ModuleAbstract} origin
         * @param {string} key
         * @returns {Subscription|null}
         */

    }, {
        key: 'getSubscription',
        value: function getSubscription(origin, key) {
            var subscriptions = origin ? this.getSubscriptions(origin) : null;
            var foundSubscription = subscriptions && subscriptions instanceof Set ? Array.from(subscriptions).filter(function (subscription) {
                return subscription.key === key;
            }) : [];

            return foundSubscription.length ? foundSubscription[0].subscription : null;
        }

        /**
         * checks if a certain subscription exists for its origin
         * @param {ModuleAbstract} origin
         * @param {string} key
         * @returns {boolean}
         */

    }, {
        key: 'subscriptionExists',
        value: function subscriptionExists(origin, key) {
            var subscription = this.getSubscription(origin, key);
            return !!subscription;
        }

        /**
         * adds a subscription to a registered Data pool by its key
         * @param {ModuleAbstract} origin - unique instance of the subscribers scope
         * @param {DataSignature.key} to - DataSignature.key
         * @param {function|object} next - callback function on next item or objects with action props
         * @param {function} error - callback function on error
         * @param {function} complete - callback function on complete queue
         * @param {function} filter - filter messages by
         * @returns {DataObserver}
         */

    }, {
        key: 'subscribe',
        value: function subscribe(origin, to, next, error, complete) {
            var _this = this;

            var filter = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
            // eslint-disable-line complexity

            if (this._observableExists(to)) {

                var nextMethod = typeof next === 'function' ? next : (typeof next === 'undefined' ? 'undefined' : _typeof(next)) === 'object' ? new _message.MessageDispatcher(next).filter(filter) : null;

                if (!nextMethod) {
                    throw new Error('No next method declared calling .subscribe()');
                } else if (nextMethod instanceof _message.MessageDispatcher) {
                    nextMethod = nextMethod.onMessage.bind(nextMethod);
                }

                var subscription = this._observables[to].observable.subscribe(nextMethod, error, complete);

                this._addSubscription(origin, to, subscription);
            } else if (this._signatureExists(to) && !this.isSignatureBusy(to)) {

                this.setSignatureBusy(to);

                var signature = this.getSignature(to);

                if (signature && typeof signature.importModule === 'function') {
                    signature.importModule(this).then(function (observableModule) {

                        try {
                            _this.addObservable(to, observableModule);
                            _this.removeSignature(to);

                            if (_this._observableExists(to)) {
                                _this.subscribe(origin, to, next, error, complete, filter);
                            } else {
                                throw new Error('Observable could not be instanciated. (' + to + ')');
                            }
                        } catch (err) {
                            _this.removeSignature(to);
                            throw new Error(err);
                        }
                    }).catch(function (err) {
                        return _this;
                    });
                } else {
                    return this;
                }
            } else if (this._signatureExists(to) && this.isSignatureBusy(to)) {
                // Retry
                window.setTimeout(function () {
                    return _this.subscribe(origin, to, next, error, complete, filter);
                }, 100);
            } else {
                return this;
            }

            return this;
        }

        /**
         * unsubscribe form a certain DataPool by origin and key
         * @param {ModuleAbstract} origin
         * @param {string} key
         * @returns {DataObserver}
         */

    }, {
        key: 'unsubscribeFrom',
        value: function unsubscribeFrom(origin, key) {
            var subscription = this.getSubscription(origin, key);
            if (subscription && typeof subscription.unsubscribe === 'function') {
                subscription.unsubscribe();
            }
            return this;
        }

        /**
         * unsubscribe all subscription of a given origin
         * @param {ModuleAbstract} origin
         * @returns {DataObserver}
         */

    }, {
        key: 'unsubscribeAll',
        value: function unsubscribeAll(origin) {
            var subscriptions = this.getSubscriptions(origin);

            if (subscriptions && subscriptions instanceof Set && subscriptions.size) {
                subscriptions.forEach(function (subscription) {
                    if (subscription && (typeof subscription === 'undefined' ? 'undefined' : _typeof(subscription)) === 'object' && _typeof(subscription.subscription) === 'object' && subscription.subscription && typeof subscription.subscription.unsubscribe === 'function') {
                        subscription.subscription.unsubscribe();
                    }
                });
            }

            return this;
        }

        /**
         * unsubscribe from subscription by origin and optionally key
         * @param {ModuleAbstract} origin
         * @param {DataSignature.key} from - DataSignature.key
         * @returns {DataObserver}
         */

    }, {
        key: 'unsubscribe',
        value: function unsubscribe(origin) {
            var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


            if (from && this.subscriptionExists(origin, from)) {
                this.unsubscribeFrom(origin, from);
            } else if (!from) {
                this.unsubscribeAll(origin);
            }

            return this;
        }

        /**
         * Push data to a Data instance
         * @param {DataSignature.key} key - DataSignature.key
         * @param {Message} message
         */

    }, {
        key: 'pushTo',
        value: function pushTo(key, message) {
            if (this._observableExists(key)) {
                if (typeof this._observables[key].push === 'function') {
                    this._observables[key].push(message);
                } else {
                    throw new Error('Observable (' + key + ') does not provide a .push() method.');
                }
            }

            return this;
        }
    }]);

    return DataObserver;
}();

exports.DataObserver = DataObserver;