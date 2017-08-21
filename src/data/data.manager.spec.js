import { DataManager } from './data.manager';

describe('DataManager', () => {

    const registry = {
        addSignatures: (r) => {
        },
    };

    const data = [
        {},
        {},
    ];

    const DM = new DataManager(
        registry,
        data
    );

    it('should exist', () => {
        expect(typeof DataManager).toBe('function');
    });

    it('should have a constructor method defined', () => {
        expect(DM.constructor).toBeDefined();
        expect(typeof DM.constructor).toBe('function');
    });

    it('should have a _init method defined', () => {
        expect(DM._init).toBeDefined();
        expect(typeof DM._init).toBe('function');
    });

    it('should have a registerData method defined', () => {
        expect(DM._registerData).toBeDefined();
        expect(typeof DM._registerData).toBe('function');
    });

    it('should bind given registry to this._registry', () => {
        expect(DM._registry).toEqual(registry);
    });

    it('should return data to this._data', () => {
        expect(DM._data).toEqual(data);
    });

    describe('#_init()', () => {

        it('should return instance actual of DataManager', () => {
            const _init = DM._init();
            expect(_init).toEqual(DM);
        });

    });

    describe('#_registerData()', () => {

        it('should return instance actual of DataManager', () => {
            const _registerData = DM._registerData();
            expect(_registerData).toEqual(DM);
        });

    });

});