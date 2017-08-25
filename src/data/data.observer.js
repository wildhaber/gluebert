import { MessageDispatcher } from '../message/message.dispatcher';

/**
 * Class represents DataObserver
 */
class DataObserver {

    /**
     * creates new DataObserver instance
     */
    constructor() {

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
    addSignature(signature) {
        this._signatures[signature.key] = Object.assign({}, signature, { busy: false });
        return this;
    }

    /**
     * remove signature
     * @param {DataSignature} signature
     * @returns {DataObserver}
     */
    removeSignature(signature) {
        delete this._signatures[signature.key];
        return this;
    }

    /**
     * get signature by key
     * @param {string} key
     * @returns {DataSignature|null}
     */
    getSignature(key) {
        return (typeof this._signatures[key] === 'object') ? this._signatures[key] : null;
    }

    /**
     * sets busy state to true for a given signature
     * while instanciating. Avoids multi instanciating
     * same DataPool
     * @param {string} key
     * @returns {DataObserver}
     */
    setSignatureBusy(key) {
        if(typeof this._signatures[key] === 'object') {
            this._signatures[key].busy = true;
        }
        return this;
    }

    /**
     * checks if signature isBusy
     * @param key
     * @returns {boolean}
     */
    isSignatureBusy(key) {
        return (typeof this._signatures[key] === 'object')
            ? this._signatures[key].busy
            : false;
    }

    /**
     * adds an observable to internalObservable storage
     * @param {string} key
     * @param {DataAbstract} observableModule
     * @returns {DataObserver}
     */
    addObservable(key, observableModule) {
        if(
            !key ||
            typeof key !== 'string' ||
            !observableModule ||
            !~['function', 'object'].indexOf(typeof observableModule)
        ) {
            return this;
        }

        this._observables[key] = {
            observable: observableModule.getObservable(),
            push: (typeof observableModule.push === 'function') ? observableModule.push.bind(observableModule) : null,
        };

        return this;
    }

    /**
     * deletes an stored observable by key
     * @param {string} key
     * @returns {DataObserver}
     */
    removeObservable(key) {
        delete this._observables[key];
        return this;
    }

    /**
     * checks if observable is registered and instanciated by key
     * @param {string} key
     * @returns {boolean}
     * @private
     */
    _observableExists(key) {
        return (
            !!key &&
            typeof key === 'string' &&
            !!this._observables[key] &&
            typeof this._observables[key] === 'object' &&
            !!this._observables[key].observable &&
            typeof this._observables[key].observable === 'object' &&
            typeof this._observables[key].observable.subscribe === 'function'
        );
    }

    /**
     * checks if signature exists by key
     * @param {string} key
     * @returns {boolean}
     * @private
     */
    _signatureExists(key) {
        return (typeof this._signatures[key] === 'object');
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
    _addSubscription(origin, key, subscription) {
        if(!this._subscriptions.has(origin)) {
            this._subscriptions.set(origin, new Set());
        }

        let currentSubscriptions = this._subscriptions.get(origin);
        currentSubscriptions.add({
            key,
            subscription,
        });

        this._subscriptions.set(origin, currentSubscriptions);

        return this;
    }

    /**
     * get a set of subscriptions by its origin
     * @param {ModuleAbstract} origin
     * @returns {Set}
     */
    getSubscriptions(origin) {
        return this._subscriptions.get(origin);
    }

    /**
     * get single subscription by its origin and data key
     * @param {ModuleAbstract} origin
     * @param {string} key
     * @returns {Subscription|null}
     */
    getSubscription(origin, key) {
        const subscriptions = (origin) ? this.getSubscriptions(origin) : null;
        const foundSubscription = (subscriptions && subscriptions instanceof Set)
            ? Array.from(subscriptions).filter((subscription) => {
                return subscription.key === key;
            })
            : [];

        return (foundSubscription.length) ? foundSubscription[0].subscription : null;
    }

    /**
     * checks if a certain subscription exists for its origin
     * @param {ModuleAbstract} origin
     * @param {string} key
     * @returns {boolean}
     */
    subscriptionExists(origin, key) {
        const subscription = this.getSubscription(origin, key);
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
    subscribe(origin, to, next, error, complete, filter = null) {

        if(this._observableExists(to)) {

            let nextMethod = (typeof next === 'function')
                ? next
                : (
                    (typeof next === 'object')
                        ? new MessageDispatcher(next).filter(filter)
                        : null
                );

            if(!nextMethod) {
                throw new Error('No next method declared calling .subscribe()');
            } else if(nextMethod instanceof MessageDispatcher) {
                nextMethod = nextMethod.onMessage.bind(nextMethod);
            }

            const subscription = this._observables[to].observable.subscribe(
                nextMethod,
                error,
                complete,
            );

            this._addSubscription(origin, to, subscription);

        } else if(
            this._signatureExists(to) &&
            !this.isSignatureBusy(to)
        ) {

            this.setSignatureBusy(to);

            this.getSignature(to)
                .importModule(this)
                .then((observableModule) => {

                    try {
                        this.addObservable(to, observableModule);
                        this.removeSignature(to);

                        if(this._observableExists(to)) {
                            this.subscribe(origin, to, next, error, complete, filter);
                        } else {
                            throw new Error('Observable could not be instanciated. (' + to + ')');
                        }
                    } catch (err) {
                        this.removeSignature(to);
                        throw new Error(err);
                    }
                });

        } else if(
            this._signatureExists(to) &&
            this.isSignatureBusy(to)
        ) {
            // Retry
            window.setTimeout(() => {
                this.subscribe(origin, to, next, error, complete, filter);
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
    unsubscribeFrom(origin, key) {
        const subscription = this.getSubscription(origin, key);
        if(
            subscription &&
            typeof subscription.unsubscribe === 'function'
        ) {
            subscription.unsubscribe();
        }
        return this;
    }

    /**
     * unsubscribe all subscription of a given origin
     * @param {ModuleAbstract} origin
     * @returns {DataObserver}
     */
    unsubscribeAll(origin) {
        const subscriptions = this.getSubscriptions(origin);

        if(
            subscriptions &&
            subscriptions instanceof Set &&
            subscriptions.size
        ) {
            subscriptions.forEach((subscription) => {
                subscription.subscription.unsubscribe();
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
    unsubscribe(origin, from = null) {

        if(from && this.subscriptionExists(origin, from)) {
            this.unsubscribeFrom(origin, from);
        } else if(!from) {
            this.unsubscribeAll(origin);
        }

        return this;
    }

    /**
     * Push data to a Data instance
     * @param {DataSignature.key} key - DataSignature.key
     * @param {Message} message
     */
    pushTo(key, message) {
        if(this._observableExists(key)) {
            if(typeof this._observables[key].push === 'function') {
                this._observables[key].push(message);
            } else {
                throw new Error('Observable (' + key + ') does not provide a .push() method.');
            }
        }
    }
}

export {
    DataObserver,
};
