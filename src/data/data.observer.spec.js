import { DataObserver } from './data.observer';
import { DataSignature } from './data.signature';
import { Subject } from 'rxjs/Subject';

describe('DataObserver', () => {

    const DO = new DataObserver();

    it('should exist', () => {
        expect(typeof DataObserver).toBe('function');
    });

    it('should have a constructor method defined', () => {
        expect(DO.constructor).toBeDefined();
        expect(typeof DO.constructor).toBe('function');
    });

    it('should have an _observables variable defined', () => {
        expect(DO._observables).toBeDefined();
        expect(typeof DO._observables).toBe('object');
        expect(DO._observables).toEqual({});
    });

    it('should have an _signatures variable defined', () => {
        expect(DO._signatures).toBeDefined();
        expect(typeof DO._signatures).toBe('object');
        expect(DO._signatures).toEqual({});
    });

    it('should have an _subscriptions variable defined', () => {
        expect(DO._subscriptions).toBeDefined();
        expect(DO._subscriptions instanceof Map).toBe(true);
    });

    describe('#addSignature()', () => {

        let signature = null;

        beforeAll(() => {
            signature = new DataSignature('key');
        });

        it('should exist', () => {
            expect(typeof DO.addSignature).toBe('function');
        });

        it('should return DataObservable instance', () => {
            expect(DO.addSignature(signature)).toEqual(DO);
        });

        it('should bind given signature to this._signatures', () => {
            DO.addSignature(signature);
            expect(DO._signatures.key).toBeDefined();
            expect(DO._signatures.key.key).toBe('key');
        });

        it('should bind given signature to this._signatures and add .busy-property', () => {
            DO.addSignature(signature);
            expect(DO._signatures.key.busy).toBe(false);
        });

    });

    describe('#removeSignature()', () => {

        let signature = null;

        beforeAll(() => {
            signature = new DataSignature('key');
        });

        it('should exist', () => {
            expect(typeof DO.removeSignature).toBe('function');
        });

        it('should return DataObservable instance', () => {
            expect(DO.removeSignature('key')).toEqual(DO);
        });

        it('should remove an added signature', () => {
            const emptyDo = new DataObserver();
            emptyDo.addSignature(signature);
            expect(emptyDo._signatures.key).toBeDefined();

            emptyDo.removeSignature(signature);
            expect(emptyDo._signatures.key).not.toBeDefined();
        });

        it('should ignore an invalid key', () => {
            const emptyDo = new DataObserver();
            expect(emptyDo.removeSignature(signature)).toEqual(emptyDo);
        });

    });

    describe('#getSignature()', () => {

        let signature = null;

        beforeAll(() => {
            signature = new DataSignature('key');
        });

        it('should exist', () => {
            expect(typeof DO.getSignature).toBe('function');
        });

        it('should return a registered signature', () => {
            DO.addSignature(signature);
            expect(DO.getSignature('key').key).toEqual('key');
        });

        it('should return null if signature is not defined', () => {
            expect(DO.getSignature('donotexist')).toEqual(null);
        });

    });

    describe('#setSignatureBusy()', () => {

        let signature = null;

        beforeAll(() => {
            signature = new DataSignature('key');
        });

        it('should exist', () => {
            expect(typeof DO.setSignatureBusy).toBe('function');
        });

        it('should set signature property busy to true', () => {
            DO.addSignature(signature);
            DO.setSignatureBusy('key');
            expect(DO.getSignature('key').busy).toBe(true);
        });

        it('should return instance of DataObservalbe', () => {
            expect(DO.setSignatureBusy('key')).toEqual(DO);
        });

        it('should ignore invalid signature key', () => {
            expect(DO.setSignatureBusy('kljwiqjq9w8dfjsadfkl')).toEqual(DO);
        });

    });


    describe('#isSignatureBusy()', () => {

        let signature = null;

        beforeAll(() => {
            signature = new DataSignature('key');
        });

        it('should exist', () => {
            expect(typeof DO.isSignatureBusy).toBe('function');
        });

        it('should determine if a signature is busy', () => {
            DO.addSignature(signature);
            DO.setSignatureBusy('key');
            expect(DO.isSignatureBusy('key')).toBe(true);
        });

        it('should return return false if signature is not busy anymore', () => {
            DO._signatures.key.busy = false;
            expect(DO.isSignatureBusy('key')).toBe(false);
        });

        it('should return false on invalid key', () => {
            expect(DO.isSignatureBusy('alksdjfklawjflqk4jasldkjf')).toBe(false);
        });

    });

    describe('#addObservable()', () => {

        let fakeObserableModule = {
            getObservable: () => null,
            push: () => 1,
        };

        let fakeObserableModuleFalsy = {
            getObservable: () => null,
            push: 'iamnotafunction',
        };

        let fakeObserableModuleInvalid = {
            getObservable: 'stringisnotgood',
        };

        it('should exist', () => {
            expect(typeof DO.addObservable).toBe('function');
        });

        it('should return this', () => {
            expect(DO.addObservable('a', fakeObserableModule)).toEqual(DO);
        });

        it('should add a given observable', () => {
            DO.addObservable('observable.key', fakeObserableModule);
            expect(DO._observables['observable.key'].observable).toBe(null);
            expect(DO._observables['observable.key'].push()).toBe(1);

            DO.addObservable('observable.falsypush', fakeObserableModuleFalsy);
            expect(DO._observables['observable.falsypush'].observable).toBe(null);
            expect(DO._observables['observable.falsypush'].push).toBe(null);
        });

        it('should ignore invalid observables', () => {
            expect(DO.addObservable(fakeObserableModuleInvalid)).toEqual(DO);
            expect(DO.addObservable(null, fakeObserableModuleInvalid)).toEqual(DO);
            expect(DO.addObservable(null)).toEqual(DO);
            expect(DO.addObservable()).toEqual(DO);
            expect(DO.addObservable('taddaa')).toEqual(DO);
            expect(DO.addObservable('taddaa', 'totoo')).toEqual(DO);
            expect(DO.addObservable(undefined, fakeObserableModule)).toEqual(DO);
        });

    });


    describe('#removeObservable()', () => {

        let fakeObserableModule = {
            getObservable: () => null,
            push: () => 1,
        };

        it('should exist', () => {
            expect(typeof DO.removeObservable).toBe('function');
        });

        it('should return this', () => {
            expect(DO.removeObservable('a')).toEqual(DO);
        });

        it('should remove a given observable', () => {
            DO.addObservable('observable.key.remove', fakeObserableModule);
            expect(DO._observables['observable.key.remove'].observable).toBe(null);
            expect(DO._observables['observable.key.remove'].push()).toBe(1);

            DO.removeObservable('observable.key.remove');
            expect(DO._observables['observable.key.remove']).toBeUndefined();
        });

        it('should ignore an invalid key', () => {
            expect(DO.removeObservable('asldkfjasdl')).toEqual(DO);
            expect(DO.removeObservable(null)).toEqual(DO);
            expect(DO.removeObservable(false)).toEqual(DO);
            expect(DO.removeObservable(NaN)).toEqual(DO);
            expect(DO.removeObservable()).toEqual(DO);
            expect(DO.removeObservable(() => null)).toEqual(DO);
        });

    });


    describe('#_observableExists()', () => {

        let fakeObserableModule = {
            getObservable: () => {
                return {
                    subscribe: () => null,
                };
            },
            push: () => 1,
        };

        let fakeObserableModuleInvalid = {
            getObservable: () => null,
            push: () => 1,
        };

        it('should exist', () => {
            expect(typeof DO._observableExists).toBe('function');
        });

        it('should return boolean', () => {
            expect(typeof DO._observableExists('a')).toBe('boolean');
            expect(typeof DO._observableExists('asdf')).toBe('boolean');
            expect(typeof DO._observableExists()).toBe('boolean');
            expect(typeof DO._observableExists('observable.key')).toBe('boolean');
        });

        it('should return true if valid observable exists', () => {
            DO.addObservable('superkey.valid', fakeObserableModule);
            expect(DO._observableExists('superkey.valid')).toBe(true);

            DO.addObservable('superkey.invalid', fakeObserableModuleInvalid);
            expect(DO._observableExists('superkey.invalid')).toBe(false);

            expect(DO._observableExists()).toBe(false);
            expect(DO._observableExists(null)).toBe(false);
        });

    });

    describe('#_signatureExists()', () => {

        let signature = null;

        beforeAll(() => {
            signature = new DataSignature('key');
            DO.addSignature(signature);
        });

        it('should exist', () => {
            expect(typeof DO._signatureExists).toBe('function');
        });

        it('should return boolean', () => {
            expect(typeof DO._signatureExists('a')).toBe('boolean');
            expect(typeof DO._signatureExists('asdf')).toBe('boolean');
            expect(typeof DO._signatureExists()).toBe('boolean');
            expect(typeof DO._signatureExists('observable.key')).toBe('boolean');
        });

        it('should return true if valid signature exists', () => {
            expect(DO._signatureExists('key')).toBe(true);
            expect(DO._signatureExists('inexist')).toBe(false);
            expect(DO._signatureExists()).toBe(false);
            expect(DO._signatureExists(null)).toBe(false);
            expect(DO._signatureExists(NaN)).toBe(false);
            expect(DO._signatureExists({})).toBe(false);
        });

    });


    describe('#_addSubscription()', () => {

        let subject = new Subject();
        let subscription = subject.subscribe((next) => {});

        it('should exist', () => {
            expect(typeof DO._addSubscription).toBe('function');
        });

        it('should return this', () => {
            expect(DO._addSubscription('a')).toEqual(DO);
            expect(DO._addSubscription(this, 'key', {})).toEqual(DO);
            expect(DO._addSubscription()).toEqual(DO);
        });

        it('should store a given subscription', () => {
            DO._addSubscription(this, 'mykey', subscription);
            expect(DO._subscriptions.has(this)).toBe(true);

            let foundOrigin = DO._subscriptions.get(this);
            let foundKey = Array.from(foundOrigin)
                .filter((entry) => {
                    return entry.key === 'mykey';
                });

            expect(foundKey.length).toBe(1);

        });

    });


    describe('#getSubscription()', () => {

        let subject = new Subject();
        let subscription = subject.subscribe((next) => {});

        it('should exist', () => {
            expect(typeof DO.getSubscription).toBe('function');
        });

        it('should return subscription or null', () => {
            expect(DO.getSubscription('asdfa434fasdf')).toBe(null);
            expect(DO.getSubscription(this, 'keyasf3')).toBe(null);
            expect(DO.getSubscription()).toBe(null);

            DO._addSubscription('origin', 'mykey2', subscription);
            expect(DO.getSubscription('origin', 'mykey2')).toEqual(subscription);

            DO._addSubscription('origin2', 'kokey', null);
            expect(DO.getSubscription('origin2', 'kokey')).toEqual(null);

        });

    });


    describe('#subscriptionExists()', () => {

        let dummySubscription = null;
        let subject = new Subject();
        let subscription = subject.subscribe((next) => {});
        DO._addSubscription('originX', 'mykey2', subscription);

        beforeAll(() => {
            dummySubscription = DO.getSubscription('originX');
        });

        it('should exist', () => {
            expect(typeof DO.subscriptionExists).toBe('function');
        });

        it('should return boolean', () => {
            expect(typeof DO.subscriptionExists('a')).toBe('boolean');
            expect(typeof DO.subscriptionExists('asdf')).toBe('boolean');
            expect(typeof DO.subscriptionExists()).toBe('boolean');
            expect(typeof DO.subscriptionExists('observable.key')).toBe('boolean');
            expect(typeof DO.subscriptionExists('originX', 'mykey2')).toBe('boolean');
        });

        it('should return true if valid subscription exists', () => {
            expect(DO.subscriptionExists(null)).toBe(false);
            expect(DO.subscriptionExists(null,{})).toBe(false);
            expect(DO.subscriptionExists()).toBe(false);
            expect(DO.subscriptionExists('observable.key')).toBe(false);
            expect(DO.subscriptionExists('originX', 'mykey2')).toBe(true);
        });

    });

    describe(`#subscribe()`, () => {

        let dummySubscription = null;
        let subject = new Subject();
        let subscription = subject.subscribe((next) => {});
        DO._addSubscription('originX', 'mykey2', subscription);

        beforeAll(() => {
            dummySubscription = DO.getSubscription('originX');
        });

        it('should exist', () => {
            expect(typeof DO.subscribe).toBe('function');
        });

        it('should return boolean', () => {
            expect(DO.subscribe('a')).toEqual(DO);
            expect(DO.subscribe('originX', 'mkey2', () => null, () => null, () => null)).toEqual(DO);
        });

    });

});