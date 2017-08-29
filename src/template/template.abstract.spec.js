import { TemplateAbstract } from './template.abstract';

describe(`TemplateAbstract`, () => {

    const TPL = new TemplateAbstract('engine');

    it(`should exist`, () => {
        expect(typeof TemplateAbstract).toBe('function');
    });

    it(`should have a constructor method`, () => {
        expect(TPL.constructor).toBeDefined();
        expect(typeof TPL.constructor).toBe('function');
    });

    it(`should expose an .engine property`, () => {
        expect(TPL.engine).toBeDefined();
    });

    it(`should expose a createView method and throw a default error message`, () => {
        expect(TPL.createView).toBeDefined();
        expect(typeof TPL.createView).toBe('function');
        expect(() => TPL.createView()).toThrowError();
    });

    it(`should expose a render method and throw a default error message`, () => {
        expect(TPL.render).toBeDefined();
        expect(typeof TPL.render).toBe('function');
        expect(() => TPL.render()).toThrowError();
    });

});