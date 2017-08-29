import { MustacheTemplate } from './mustache.template';

describe(`MustacheTemplate`, () => {

    const MOCK_ENGINE = {
        render: (tpl) => tpl
    };

    const TPL = new MustacheTemplate(MOCK_ENGINE);

    it(`should exist`, () => {
        expect(typeof MustacheTemplate).toBe('function');
    });

    it(`should have a constructor method`, () => {
        expect(TPL.constructor).toBeDefined();
        expect(typeof TPL.constructor).toBe('function');
    });

    it(`should expose an .engine property`, () => {
        expect(TPL.engine).toBeDefined();
    });

    it(`should expose a createView property`, () => {
        expect(TPL.createView).toBeDefined();
        expect(TPL.createView('in')).toBe('in');
    });

    it(`should expose a render property`, () => {
        expect(TPL.render).toBeDefined();
        expect(TPL.render('in', {})).toBe('in');
    });

});