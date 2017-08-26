import { Message } from './message';

describe('Message', () => {

    const MSG = new Message('message.action');
    const MSGData = new Message('message.action', {});
    const MSGDataFalse = new Message('message.action', false);
    const MSGDataMalformed = new Message('message.action', undefined);
    const MSGNoAction = new Message();
    const MSGBadAction = new Message({});

    it('should exist', () => {
        expect(typeof Message).toBe('function');
    });

    it('should expose a .action property', () => {
        expect(MSG.action).toBeDefined();
        expect(MSGData.action).toBeDefined();
        expect(MSGDataMalformed.action).toBeDefined();
        expect(MSGNoAction.action).toBeDefined();
    });

    it('should expose a .data property', () => {
        expect(MSG.data).toBeDefined();
        expect(MSGData.data).toBeDefined();
        expect(MSGDataMalformed.data).toBeDefined();
        expect(MSGNoAction.data).toBeDefined();
    });

    it('should have a .getAction() method', () => {
        expect(MSG.getAction).toBeDefined();
        expect(typeof MSG.getAction).toBe('function');
    });

    it('should have a .getData() method', () => {
        expect(MSG.getData).toBeDefined();
        expect(typeof MSG.getData).toBe('function');
    });

    it('should bind given action to .action property', () => {
        expect(MSG.action).toBe('message.action');
        expect(MSGData.action).toBe('message.action');
        expect(MSGDataMalformed.action).toBe('message.action');
        expect(MSGNoAction.action).toBe(null);
        expect(MSGBadAction.action).toBe(null);
    });

    describe(`#getAction()`, () => {

        it('should return given action', () => {
            expect(MSG.getAction()).toBe('message.action');
            expect(MSGData.getAction()).toBe('message.action');
            expect(MSGDataMalformed.getAction()).toBe('message.action');
            expect(MSGNoAction.getAction()).toBe(null);
            expect(MSGBadAction.getAction()).toBe(null);
        });

    });

    describe(`#getData()`, () => {

        it('should return given data', () => {
            expect(MSG.getData()).toBe(null);
            expect(MSGData.getData()).toEqual({});
            expect(MSGDataMalformed.getData()).toBe(null);
            expect(MSGNoAction.getData()).toBe(null);
            expect(MSGDataFalse.getData()).toBe(false);
        });

    });


    describe(`#hasData()`, () => {

        it('should return if data given', () => {
            expect(MSG.hasData()).toBe(false);
            expect(MSGData.hasData()).toEqual(true);
            expect(MSGDataMalformed.hasData()).toBe(false);
            expect(MSGNoAction.hasData()).toBe(false);
            expect(MSGDataFalse.hasData()).toBe(true);
        });

    });

});