import { ElementSignature } from './element.signature';

describe('ElementSignature', () => {

    const ES = new ElementSignature('signature.test', async () => null);
    const ESInvalid = new ElementSignature(undefined, async () => null);
    const ESInvalid2 = new ElementSignature(async () => null);
    const ESInvalid3 = new ElementSignature();

    it('should exist', () => {
        expect(typeof ElementSignature).toBe('function');
    });

    it('should expose a .name property', () => {
        expect(ES.name).toBeDefined();
    });

    it('should expose a .schemaImport property', () => {
        expect(ES.schemaImport).toBeDefined();
        expect(ES.schemaImport() instanceof Promise).toBe(true);
    });

    it('should expose a .templateImport property', () => {
        expect(ES.templateImport).toBeDefined();
        expect(ES.templateImport() instanceof Promise).toBe(true);
    });

    it('should expose a .elementImport property', () => {
        expect(ES.elementImport).toBeDefined();
        expect(ES.elementImport() instanceof Promise).toBe(true);
    });

    it('should bind given name when string or ignore if invalid', () => {
        expect(ES.name).toBe('signature.test');
        expect(ESInvalid.name).toBe(null);
        expect(ESInvalid2.name).toBe(null);
        expect(ESInvalid3.name).toBe(null);
    });


    describe('#setImportSchema()', () => {

        let testCallback = () => {};

        it('should set given importSchema callback or ignore if not callback', () => {
            ES.setImportSchema(testCallback);
            expect(ES.getImportSchema()).toEqual(testCallback);

            ES.setImportSchema('invalid');
            expect(ES.getImportSchema()).toEqual(testCallback);

            ES.setImportSchema(null);
            expect(ES.getImportSchema()).toEqual(testCallback);
        });

    });


    describe('#setTemplateImport()', () => {

        let testCallback = () => {};

        it('should set given TemplateImport callback or ignore if not callback', () => {
            ES.setTemplateImport(testCallback);
            expect(ES.getTemplateImport()).toEqual(testCallback);

            ES.setTemplateImport('invalid');
            expect(ES.getTemplateImport()).toEqual(testCallback);

            ES.setTemplateImport(null);
            expect(ES.getTemplateImport()).toEqual(testCallback);
        });

    });

    describe('#setElementImport()', () => {

        let testCallback = () => {};

        it('should set given ElementImport callback or ignore if not callback', () => {
            ES.setElementImport(testCallback);
            expect(ES.getElementImport()).toEqual(testCallback);

            ES.setElementImport('invalid');
            expect(ES.getElementImport()).toEqual(testCallback);

            ES.setElementImport(null);
            expect(ES.getElementImport()).toEqual(testCallback);
        });

    });

});