import { DataSignature } from './data.signature';

describe('DataSignature', () => {

    const DS = new DataSignature('signature.test', async () => null);
    const DSInvalid = new DataSignature(undefined, async () => null);
    const DSInvalid2 = new DataSignature(async () => null);
    const DSInvalid3 = new DataSignature();

    it('should exist', () => {
        expect(typeof DataSignature).toBe('function');
    });

    it('should expose a .key-property', () => {
        expect(DS.key).toBeDefined();
    });

    it('should expose a .importModule-property', () => {
        expect(DS.importModule).toBeDefined();
    });

    it('should bind given key when string or ignore if invalid', () => {
        expect(DS.key).toBe('signature.test');
        expect(DSInvalid.key).toBe(null);
        expect(DSInvalid2.key).toBe(null);
        expect(DSInvalid3.key).toBe(null);
    });

    it('should bind given importModule when callback or fallback when no key given', () => {
        expect(typeof DS.importModule).toBe('function');
        expect(typeof DSInvalid.importModule).toBe('function');
        expect(typeof DSInvalid2.importModule).toBe('function');
        expect(typeof DSInvalid3.importModule).toBe('function');
    });

});