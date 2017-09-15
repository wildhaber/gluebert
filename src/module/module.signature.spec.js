import { ModuleSignature } from './module.signature';
import { ElementSignature } from '../element/element.signature';

describe('ModuleSignature', () => {

    const MS = new ModuleSignature('signature.test', 'div');
    const MS2 = new ModuleSignature('signature.test', 'div');
    const MSInvalid = new ModuleSignature(undefined, null);
    const MSInvalid2 = new ModuleSignature(() => Promise.resolve());
    const MSInvalid3 = new ModuleSignature();

    it('should exist', () => {
        expect(typeof ModuleSignature).toBe('function');
    });

    it('should expose a .name property', () => {
        expect(MS.name).toBeDefined();
    });

    it('should expose a .selector property', () => {
        expect(MS.selector).toBeDefined();
    });

    it('should expose a .setSelector property', () => {
        expect(MS.setSelector).toBeDefined();
        expect(typeof MS.setSelector).toBe('function');
    });

    it('should expose a .getSelector property', () => {
        expect(MS.getSelector).toBeDefined();
        expect(typeof MS.getSelector).toBe('function');
    });

    it('should expose a .setImportController property', () => {
        expect(MS.setImportController).toBeDefined();
        expect(typeof MS.setImportController).toBe('function');
        expect(MS.setImportController()).toEqual(MS);
    });

    it('should expose a .getImportController property', () => {
        expect(MS.getImportController).toBeDefined();
        expect(typeof MS.getImportController).toBe('function');
    });

    it('should expose a .setImportStyles property', () => {
        expect(MS.setImportStyles).toBeDefined();
        expect(typeof MS.setImportStyles).toBe('function');
        expect(MS.setImportStyles()).toEqual(MS);
    });

    it('should expose a .getImportStyles property', () => {
        expect(MS.getImportStyles).toBeDefined();
        expect(typeof MS.getImportStyles).toBe('function');
    });

    it('should expose a .addElementSignature property', () => {
        expect(MS.addElementSignature).toBeDefined();
        expect(typeof MS.addElementSignature).toBe('function');
        expect(MS.addElementSignature()).toEqual(MS);
    });

    it('should expose a .getElementSignatures property', () => {
        expect(MS.getElementSignatures).toBeDefined();
        expect(typeof MS.getElementSignatures).toBe('function');
    });

    it('should bind given name when string or ignore if invalid', () => {
        expect(MS.name).toBe('signature.test');
        expect(MSInvalid.name).toBe(null);
        expect(MSInvalid2.name).toBe(null);
        expect(MSInvalid3.name).toBe(null);
    });

    it('should bind given selector when string or ignore if invalid', () => {
        expect(MS.selector).toBe('div');
        expect(MSInvalid.selector).toBe(null);
        expect(MSInvalid2.selector).toBe(null);
        expect(MSInvalid3.selector).toBe(null);
    });


    describe('#setSelector()', () => {

        it('should set given selector or ignore if not string', () => {
            MS.setSelector('test.selector');
            expect(MS.getSelector()).toBe('test.selector');

            MS.setSelector(() => {});
            expect(MS.getSelector()).toBe(null);

            MS.setSelector(null);
            expect(MS.getSelector()).toBe(null);

            MS.setSelector();
            expect(MS.getSelector()).toBe(null);
        });

    });


    describe('#setImportController()', () => {

        let testCallback = () => {};

        it('should set given ImportController callback or ignore if not callback', () => {
            MS.setImportController(testCallback);
            expect(MS.getImportController()).toEqual(testCallback);

            MS.setImportController('invalid');
            expect(MS.getImportController()).toEqual(null);

            MS.setImportController(null);
            expect(MS.getImportController()).toEqual(null);
        });

    });

    describe('#setImportStyles()', () => {

        let testCallback = () => {};

        it('should set given ImportStyles callback or ignore if not callback', () => {
            MS.setImportStyles(testCallback);
            expect(MS.getImportStyles()).toEqual(testCallback);

            MS.setImportStyles('invalid');
            expect(MS.getImportStyles()).toEqual(null);

            MS.setImportStyles(null);
            expect(MS.getImportStyles()).toEqual(null);
        });

    });

    describe('#addElementSignature()', () => {

        let testSignature = new ElementSignature('signature.element');
        let testSignature2 = new ElementSignature('signature.element.2');

        it('should set added signatures', () => {
            MS2.addElementSignature(testSignature);
            expect(MS2.getElementSignatures().size).toBe(1);

            MS2.addElementSignature(testSignature2);
            expect(MS2.getElementSignatures().size).toBe(2);

            // Ignore double entries
            MS2.addElementSignature(testSignature2);
            expect(MS2.getElementSignatures().size).toBe(2);
        });

    });

    describe('#disableLazy()', () => {

        const lazyDisabled = new ModuleSignature('signature.element');
        const lazyEnabled = new ModuleSignature('signature.element.2');

        it('should set a is lazy flag to false', () => {

            lazyDisabled.disableLazy();

            expect(lazyDisabled.isLazy).toBe(false);
            expect(lazyEnabled.isLazy).toBe(true);
        });

    });

});