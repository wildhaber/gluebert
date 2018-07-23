import { ElementAbstract } from './element.abstract';

describe('ElementAbstract', () => {

    const fragment = document.createDocumentFragment();

    const EA = new ElementAbstract(
        {},
        fragment
    );

    const EAInvalid = new ElementAbstract(
        undefined,
        null
    );

    it('should exist', () => {
        expect(typeof ElementAbstract).toBe('function');
    });

    it('should have a constructor method defined', () => {
        expect(EA.constructor).toBeDefined();
        expect(typeof EA.constructor).toBe('function');
    });

    it('should have a bindData method defined', () => {
        expect(EA.bindData).toBeDefined();
        expect(typeof EA.bindData).toBe('function');
    });

    it('should have a create method defined', () => {
        expect(EA.create).toBeDefined();
        expect(typeof EA.create).toBe('function');
    });

    it('should bind given data to this._data', () => {
        expect(EA._data).toEqual({});
        expect(EAInvalid._data).toBe(null);
    });

    it('should bind given template to this._template', () => {
        expect(EA._template).toEqual(fragment);
        expect(EAInvalid._template).toBe(null);
    });

    describe('#create()', () => {

        it('should return an node from given fragment', () => {
            expect(EA.create() instanceof Node).toBe(true);
            expect(EAInvalid.create()).toBe(null);
        });
    });

});