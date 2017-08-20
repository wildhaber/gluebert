import { ControllerAbstract } from './controller.abstract';

describe('ControllerAbstract', () => {

    const element = document.createElement('div');
    const data = {};
    const elements = [];

    const CA = new ControllerAbstract(
        element,
        data,
        elements
    );

    it('should exist', () => {
        expect(typeof ControllerAbstract).toBe('function');
    });

    it('should have a constructor method defined', () => {
        expect(CA.constructor).toBeDefined();
        expect(typeof CA.constructor).toBe('function');
    });

    it('should have a destruct method defined', () => {
        expect(CA.destruct).toBeDefined();
        expect(typeof CA.destruct).toBe('function');
    });

    it('should throw an error on default destruct', () => {
        expect(() => CA.destruct()).toThrowError();
    });

    it('should bind given element to this._element', () => {
        expect(CA._element).toEqual(element);
    });

    it('should bind given data to this._data', () => {
        expect(CA._data).toEqual(data);
    });

    it('should bind given elements to this._elements', () => {
        expect(CA._elements).toEqual(elements);
    });

});