import { MessageDispatcher } from './message.dispatcher';
import { Message } from './message';

describe(`MessageDispatcher`, () => {

    const actionAllocator = {
        actionA: {
            fn: () => {
            },
            filter: (input) => !!input,
        },
        actionB: () => {
        },
    };

    const filter = () => true;

    const actionAllocatorInvalidFilter = {
        filter: null,
    };

    const MD = new MessageDispatcher(actionAllocator).filter(filter);
    const MD2 = new MessageDispatcher();
    const MD3 = new MessageDispatcher(actionAllocatorInvalidFilter).filter(filter);

    const msg1 = new Message('actionA', {});
    const msg2 = new Message('actionB', {});
    const msg3 = new Message('actionC', {});
    const msg4 = new Message('actionE');

    it('should exist', () => {
        expect(typeof MessageDispatcher).toBe('function');
    });

    it('should have a constructor method defined', () => {
        expect(MD.constructor).toBeDefined();
        expect(typeof MD.constructor).toBe('function');
    });

    it('should have a _actionAllocator property defined', () => {
        expect(MD._actionAllocator).toBeDefined();
    });

    it('should have a _filter property defined', () => {
        expect(MD._filter).toBeDefined();
    });

    it('should have a onMessage() method defined', () => {
        expect(MD.onMessage).toBeDefined();
        expect(typeof MD.onMessage).toBe('function');
    });

    it('should have a _runObjectAllocator() method defined', () => {
        expect(MD._runObjectAllocator).toBeDefined();
        expect(typeof MD._runObjectAllocator).toBe('function');
    });

    it('should have a filter() method defined', () => {
        expect(MD.filter).toBeDefined();
        expect(typeof MD.filter).toBe('function');
    });

    describe(`#onMessage()`, () => {

        it(`should handle messages`, () => {
            expect(() => MD.onMessage(msg1)).not.toThrowError();
            expect(() => MD.onMessage(msg2)).not.toThrowError();
            expect(() => MD.onMessage(msg3)).not.toThrowError();
            expect(() => MD.onMessage(msg4)).not.toThrowError();
            expect(() => MD.onMessage()).not.toThrowError();
            expect(() => MD2.onMessage(msg1)).not.toThrowError();
            expect(() => MD2.onMessage(msg2)).not.toThrowError();
            expect(() => MD2.onMessage(msg3)).not.toThrowError();
            expect(() => MD2.onMessage(msg4)).not.toThrowError();
            expect(() => MD2.onMessage()).not.toThrowError();
            expect(() => MD3.onMessage(msg1)).not.toThrowError();
            expect(() => MD3.onMessage(msg2)).not.toThrowError();
            expect(() => MD3.onMessage(msg3)).not.toThrowError();
            expect(() => MD3.onMessage(msg4)).not.toThrowError();
            expect(() => MD3.onMessage()).not.toThrowError();
        });

    });

    describe(`#filter()`, () => {

        it(`should set defined global filter`, () => {
            MD.filter(filter);
            expect(MD._filter).toEqual(filter);
        });

        it(`should ignore filters that are not functions`, () => {
            MD2.filter({});
            expect(MD2._filter).toBe(null);

            MD2.filter(true);
            expect(MD2._filter).toBe(null);
        });

    });

});