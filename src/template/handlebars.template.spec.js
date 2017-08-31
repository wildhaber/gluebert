import { HandlebarsTemplate } from './handlebars.template';

describe(`HandlebarsTemplate`, () => {

    const MOCK_ENGINE = {
        compile: (view) => {
            return (tpl) => tpl;
        },
        render: (view, data) => {
            return view;
        },
    };

    const TPL = new HandlebarsTemplate(MOCK_ENGINE);

    it(`should exist`, () => {
        expect(typeof HandlebarsTemplate).toBe('function');
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
        expect(typeof TPL.createView).toBe('function');
    });

    it(`should expose a render property`, () => {
        expect(TPL.render).toBeDefined();
        expect(typeof TPL.render).toBe('function');
    });

    describe(`#createView()`, () => {

        it(`should expose a view function`, () => {
            expect(typeof TPL.createView('view')).toBe('function');
        });

    });

    describe(`#render()`, () => {

        it(`should expose a template string`, () => {
            expect(TPL.render(TPL.createView('view'), 'view')).toBe('view');
        });

    });

});