import { Gluebert } from './gluebert.bootstrap';
import { ModuleSignature } from './module/module.signature';
import { ElementSignature } from './element/element.signature';

describe(`Gluebert`, () => {

    const gluebert = new Gluebert([], []);

    const secondGluebert = new Gluebert(
        [
            new ModuleSignature('mod1')
                .addElementSignature(
                    new ElementSignature('el1'),
                ),
            new ModuleSignature('mod2')
                .addElementSignature(
                    new ElementSignature('el2'),
                ),
            new ModuleSignature('mod3'),
        ],
        [],
    )
        .setSchemaValidator('schema')
        .setTemplateEngine('template');

    const badGluebert = new Gluebert('sup',undefined)
        .setSchemaValidator(NaN)
        .setTemplateEngine(() => {});

    it('should exist', () => {
        expect(typeof Gluebert).toBe('function');
    });

    it('should have a constructor method defined', () => {
        expect(gluebert.constructor).toBeDefined();
        expect(typeof gluebert.constructor).toBe('function');
    });

    it('should have a start method defined', () => {
        expect(gluebert.start).toBeDefined();
        expect(typeof gluebert.start).toBe('function');
    });

    it('should have a _init method defined', () => {
        expect(gluebert._init).toBeDefined();
        expect(typeof gluebert._init).toBe('function');
    });

    it('should have a _extractElements method defined', () => {
        expect(gluebert._extractElements).toBeDefined();
        expect(typeof gluebert._extractElements).toBe('function');
    });

    it('should have a setSchemaValidator method defined', () => {
        expect(gluebert.setSchemaValidator).toBeDefined();
        expect(typeof gluebert.setSchemaValidator).toBe('function');
    });

    it('should have a setTemplateEngine method defined', () => {
        expect(gluebert.setTemplateEngine).toBeDefined();
        expect(typeof gluebert.setTemplateEngine).toBe('function');
    });

    it('should bind given modules to this._modules', () => {
        expect(gluebert._modules).toEqual([]);
    });

    it('should bind given elements to this._elements', () => {
        expect(gluebert._elements).toEqual([]);
    });

    it('should bind given data to this._data', () => {
        expect(gluebert._data).toEqual([]);
    });

    it('should bind given_schemaValidator to this._schemaValidator but ignore others than function', () => {
        expect(gluebert._schemaValidator).toBe(null);
        expect(secondGluebert._schemaValidator).toBe(null);
    });

    it('should bind given_templateEngine to this._templateEngine but ignore others than function', () => {
        expect(gluebert._templateEngine).toEqual(null);
        expect(secondGluebert._templateEngine).toEqual(null);
    });

    describe(`#start()`, () => {

        it(`should return this`, () => {
            expect(gluebert.start()).toEqual(gluebert);
        });

    });

    describe(`#setSchemaValidator()`, () => {

        it(`should return this`, () => {
            expect(gluebert.setSchemaValidator()).toEqual(gluebert);
            expect(gluebert.setSchemaValidator(null)).toEqual(gluebert);
            expect(gluebert.setSchemaValidator(undefined)).toEqual(gluebert);
        });

    });

});