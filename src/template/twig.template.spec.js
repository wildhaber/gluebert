import { TwigTemplate } from './twig.template';

describe(`TwigTemplate`, () => {

    const MOCK_ENGINE = {
        twig: (tpl) => {
            return {
                render: (data) => data,
            };
        },
    };

    const TPL = new TwigTemplate(MOCK_ENGINE);

    it(`should exist`, () => {
        expect(typeof TwigTemplate).toBe('function');
    });

    it(`should have a constructor method`, () => {
        expect(TPL.constructor).toBeDefined();
        expect(typeof TPL.constructor).toBe('function');
    });

    it(`should expose an .engine property`, () => {
        expect(TPL.engine).toBeDefined();
    });

    it(`should expose a createView method`, () => {
        expect(TPL.createView).toBeDefined();
        expect(typeof TPL.createView).toBe('function');
        expect(() => TPL.createView()).not.toThrowError();
    });

    it(`should expose a render method`, () => {
        expect(TPL.render).toBeDefined();
        expect(typeof TPL.render).toBe('function');
        expect(() => TPL.render(TPL.createView(),{})).not.toThrowError();
    });

});