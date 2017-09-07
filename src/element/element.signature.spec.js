import { ElementSignature } from './element.signature';

describe('ElementSignature', () => {

    const ES = new ElementSignature('signature.test',  () => Promise.resolve());
    const ESInvalid = new ElementSignature(undefined, () => Promise.resolve());
    const ESInvalid2 = new ElementSignature(() => Promise.resolve());
    const ESInvalid3 = new ElementSignature();

    it('should exist', () => {
        expect(typeof ElementSignature).toBe('function');
    });

    it('should expose a .name property', () => {
        expect(ES.name).toBeDefined();
    });

    it('should expose a .schemaImport property', () => {
        expect(ES.importSchema).toBeDefined();
        expect(ES.importSchema() instanceof Promise).toBe(true);
    });

    it('should expose a .templateImport property', () => {
        expect(ES.importTemplate).toBeDefined();
        expect(ES.importTemplate() instanceof Promise).toBe(true);
    });

    it('should expose a .elementImport property', () => {
        expect(ES.importElement).toBeDefined();
        expect(ES.importElement() instanceof Promise).toBe(true);
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


    describe('#setImportTemplate()', () => {

        let testCallback = () => {};

        it('should set given ImportTemplate callback or ignore if not callback', () => {
            ES.setImportTemplate(testCallback);
            expect(ES.getImportTemplate()).toEqual(testCallback);

            ES.setImportTemplate('invalid');
            expect(ES.getImportTemplate()).toEqual(testCallback);

            ES.setImportTemplate(null);
            expect(ES.getImportTemplate()).toEqual(testCallback);
        });

    });

    describe('#setImportElement()', () => {

        let testCallback = () => {};

        it('should set given ImportElement callback or ignore if not callback', () => {
            ES.setImportElement(testCallback);
            expect(ES.getImportElement()).toEqual(testCallback);

            ES.setImportElement('invalid');
            expect(ES.getImportElement()).toEqual(testCallback);

            ES.setImportElement(null);
            expect(ES.getImportElement()).toEqual(testCallback);
        });

    });

});