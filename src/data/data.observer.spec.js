import { DataObserver } from './data.observer';
import { DataSignature } from './data.signature';

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
        expect(DO._subscriptions).toEqual(new Map());
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

});