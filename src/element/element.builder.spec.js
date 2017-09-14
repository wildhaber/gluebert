import { ElementBuilder } from './element.builder';
import { ElementSignature } from './element.signature';

describe('ElementBuilder', () => {

    const EB = new ElementBuilder();
    const EBTemplate = new ElementBuilder(null, () => {
    });
    const EBTemplateSchema = new ElementBuilder(null, () => {
    }, () => {
    });
    const EBInvalidTemplateSchema = new ElementBuilder(null, null, undefined);

    it('should exist', () => {
        expect(typeof ElementBuilder).toBe('function');
    });

    it('should have a constructor method defined', () => {
        expect(EB.constructor).toBeDefined();
        expect(typeof EB.constructor).toBe('function');
    });

    it('should have a _schemaValidator property defined', () => {
        expect(EB._schemaValidator).toBeDefined();
    });

    it('should have a _templateEngine property defined', () => {
        expect(EB._templateEngine).toBeDefined();
    });

    it('should have a _signatures property defined', () => {
        expect(EB._signatures).toBeDefined();
        expect(typeof EB._signatures).toBe('object');
    });

    it('should have a _elements property defined', () => {
        expect(EB._elements).toBeDefined();
        expect(typeof EB._elements).toBe('object');
    });

    it('should have a _transformToObject method', () => {
        expect(EB._transformToObject).toBeDefined();
        expect(typeof EB._transformToObject).toBe('function');
    });

    it('should have a _elementExists method', () => {
        expect(EB._elementExists).toBeDefined();
        expect(typeof EB._elementExists).toBe('function');
    });

    it('should have a getElement method', () => {
        expect(EB.getElement).toBeDefined();
        expect(typeof EB.getElement).toBe('function');
    });

    it('should have a getSignature method', () => {
        expect(EB.getSignature).toBeDefined();
        expect(typeof EB.getSignature).toBe('function');
    });

    it('should have a removeSignature method', () => {
        expect(EB.removeSignature).toBeDefined();
        expect(typeof EB.removeSignature).toBe('function');
    });

    it('should have a _signatureExists method', () => {
        expect(EB._signatureExists).toBeDefined();
        expect(typeof EB._signatureExists).toBe('function');
    });

    it('should have a isBusySignature method', () => {
        expect(EB.isBusySignature).toBeDefined();
        expect(typeof EB.isBusySignature).toBe('function');
    });

    it('should have a setBusySignature method', () => {
        expect(EB.setBusySignature).toBeDefined();
        expect(typeof EB.setBusySignature).toBe('function');
    });

    it('should have a getTemplateElement method', () => {
        expect(EB.getTemplateElement).toBeDefined();
        expect(typeof EB.getTemplateElement).toBe('function');
    });

    it('should have a getSchema method', () => {
        expect(EB.getSchema).toBeDefined();
        expect(typeof EB.getSchema).toBe('function');
    });

    it('should have a _validate method', () => {
        expect(EB._validate).toBeDefined();
        expect(typeof EB._validate).toBe('function');
    });

    it('should have a addElement method', () => {
        expect(EB.addElement).toBeDefined();
        expect(typeof EB.addElement).toBe('function');
    });

    it('should have a create method', () => {
        expect(EB.create).toBeDefined();
        expect(typeof EB.create).toBe('function');
    });

    describe(`#_transformToObject()`, () => {

        it('should return an object', () => {
            expect(EB._transformToObject()).toEqual({});
        });

        it('should transform an array into object with name property as key', () => {

            let sampleSignatures = [
                new ElementSignature('naaame'),
                new ElementSignature('tadaa'),
                new ElementSignature('guguseli'),
                new ElementSignature(undefined),
                new ElementSignature(),
                'ignoreme',
                {},
                null,
                NaN,
            ];

            let transformed = EB._transformToObject(sampleSignatures);
            expect(Object.keys(transformed).length).toBe(3);

        });

    });

    describe(`#_elementExists()`, () => {

        it('should return a boolean', () => {
            expect(typeof EB._elementExists()).toBe('boolean');
            expect(typeof EB._elementExists('inexisting')).toBe('boolean');
        });

        it('should return true if an element exists and has proper content', () => {

            const EB2 = new ElementBuilder();
            EB2._elements.testElement = {};
            EB2._elements.invalidElement = true;
            EB2._elements.nullElement = null;

            expect(EB2._elementExists('testElement')).toBe(true);
            expect(EB2._elementExists('invalidElement')).toBe(false);
            expect(EB2._elementExists('nullElement')).toBe(false);
        });

    });

    describe(`#getElement()`, () => {

        it('should return an element or null', () => {

            const EB2 = new ElementBuilder();
            EB2._elements.testElement = {};
            EB2._elements.invalidElement = true;
            EB2._elements.nullElement = null;

            expect(EB2.getElement('testElement')).toEqual(EB2._elements.testElement);
            expect(EB2.getElement('invalidElement')).toBe(null);
            expect(EB2.getElement('nullElement')).toBe(null);
        });

    });

    describe(`#getSignature()`, () => {

        it('should return a signature or null', () => {

            const EB2 = new ElementBuilder();
            EB2._signatures.testSignature = new ElementSignature('testSignature');
            EB2._signatures.invalid = true;
            EB2._signatures.nullSignature = null;

            expect(EB2.getSignature('testSignature')).toEqual(EB2._signatures.testSignature);
            expect(EB2.getSignature('invalid')).toBe(null);
            expect(EB2.getSignature('nullSignature')).toBe(null);
        });

    });

    describe(`#removeSignature()`, () => {

        it('should remove a signature and return this', () => {

            const EB2 = new ElementBuilder();
            EB2._signatures.testSignature = new ElementSignature('testSignature');

            expect(EB2._signatures.testSignature).toBeDefined();
            expect(EB2.removeSignature('testSignature')).toEqual(EB2);
            expect(EB2._signatures.testSignature).not.toBeDefined();

            expect(EB2.removeSignature()).toEqual(EB2);
            expect(EB2.removeSignature(null)).toEqual(EB2);
            expect(EB2.removeSignature('inexistingString')).toEqual(EB2);
        });

    });

    describe(`#_signatureExists()`, () => {

        it('should return a boolean', () => {
            expect(typeof EB._signatureExists()).toBe('boolean');
            expect(typeof EB._signatureExists('inexisting')).toBe('boolean');
        });

        it('should return true if a signature exists and has proper content', () => {

            const EB2 = new ElementBuilder();
            EB2._signatures.testSignature = new ElementSignature('testSignature');
            EB2._signatures.invalid = true;
            EB2._signatures.nullSignature = null;

            expect(EB2._signatureExists('testSignature')).toBe(true);
            expect(EB2._signatureExists('invalid')).toBe(false);
            expect(EB2._signatureExists('nullSignature')).toBe(false);
        });

    });

    describe(`#isBusySignature()`, () => {

        const EB2 = new ElementBuilder();
        EB2._signatures.testSignature = new ElementSignature('testSignature');

        it('should return a boolean', () => {

            expect(typeof EB2.isBusySignature()).toBe('boolean');
            expect(typeof EB2.isBusySignature('testSignature')).toBe('boolean');
            expect(typeof EB2.isBusySignature(null)).toBe('boolean');
            expect(typeof EB2.isBusySignature(undefined)).toBe('boolean');
            expect(typeof EB2.isBusySignature({})).toBe('boolean');

        });

        it('should return true if a signature is busy', () => {

            EB2.setBusySignature('testSignature');
            expect(EB2.isBusySignature('testSignature')).toBe(true);

            EB2.setBusySignature(null);
            expect(EB2.isBusySignature(null)).toBe(false);

            EB2.setBusySignature();
            expect(EB2.isBusySignature()).toBe(false);

        });

    });

    describe(`#setBusySignature()`, () => {

        const EB2 = new ElementBuilder();
        EB2._signatures.testSignature = new ElementSignature('testSignature');

        it('should return this', () => {

            expect(EB2.setBusySignature()).toEqual(EB2);
            expect(EB2.setBusySignature('testSignature')).toEqual(EB2);
            expect(EB2.setBusySignature(null)).toEqual(EB2);
            expect(EB2.setBusySignature(undefined)).toEqual(EB2);
            expect(EB2.setBusySignature({})).toEqual(EB2);

        });

        it('should set an existing signature to busy', () => {

            EB2.setBusySignature('testSignature');
            expect(EB2.isBusySignature('testSignature')).toBe(true);

            EB2.setBusySignature(null);
            expect(EB2.isBusySignature(null)).toBe(false);

            EB2.setBusySignature();
            expect(EB2.isBusySignature()).toBe(false);

        });

    });

    describe(`#getTemplateElement()`, () => {
        // TODO: rewrite this method to have IE Support
    });

    describe(`#getSchema()`, () => {

        const EB2 = new ElementBuilder();
        EB2.addElement('element.name', 'schema', 'template', (module) => {
        });
        EB2._elements.invalidElement = null;
        EB2._elements.invalidElement2 = {};

        it(`should return a schema of a given element.name`, () => {
            expect(EB2.getSchema('element.name')).toBe('schema');
            expect(EB2.getSchema('inexistingElement')).toBe(null);
            expect(EB2.getSchema('invalidElement2')).toBe(null);
        });

    });

    describe(`#_validate()`, () => {

        const EB2 = new ElementBuilder();
        EB2.addElement('element.name', () => true, 'template', (module) => {
        });
        EB2._elements.invalidElement = null;

        it(`should validate data schema against of existing elements`, () => {
            expect(EB2._validate('element.name', {})).toBe(true);
            expect(EB2._validate('inexistingElement', {})).toBe(false);
            expect(EB2._validate('invalidElement2', {})).toBe(false);
        });

    });

    describe(`#create()`, () => {

        const EB2 = new ElementBuilder();
        EB2.addElement('element.name', () => true, 'template', (module) => {
        });
        EB2._signatures['brand.new.element'] = new ElementSignature('brand.new.element');

        it(`should return an element instance or null if element does not exist`, () => {
            expect(EB2.create('element.name') instanceof Promise).toBe(true);

            // Check initialize and busy state (that's why there are two calls just after each other
            expect(EB2.create('brand.new.element') instanceof Promise).toBe(true);
            expect(EB2.create('brand.new.element') instanceof Promise).toBe(true);

            expect(EB2.create('inexisting element') instanceof Promise).toBe(true);
        });

    });

    describe('#_getTemplateElementClassic()', () => {

        const renderedElement = document.createElement('div');
        renderedElement.innerHTML = '<div></div>';

        const templateEngine = {
            render: (i) => renderedElement,
        };

        const EBWithTemplate = new ElementBuilder([], templateEngine);

        it('should render a template', () => {
            expect(EBWithTemplate._getTemplateElementClassic('<template>', {}) instanceof Node).toBe(true);
        });

    });

    describe('#_getOptions()', () => {

        const options = {
            my: 'option',
        };

        const EBWithOptions = new ElementBuilder([], null, null, options);

        it('should return given options', () => {
            expect(EBWithOptions.getOptions()).toEqual(options);
        });

    });

    describe('#getElementReadyClass()', () => {

        const options = {
            elementReadyClass: 'readyClass',
        };

        const EBWithOptions = new ElementBuilder([], null, null, options);
        const EBNoOptions = new ElementBuilder();

        it('should return given options', () => {
            expect(EBWithOptions.getElementReadyClass()).toBe(options.elementReadyClass);
        });

        it('should return null if no options defined', () => {
            expect(EBNoOptions.getElementReadyClass()).toBe(null);
        });

    });

});