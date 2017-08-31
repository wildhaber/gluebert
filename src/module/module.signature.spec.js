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

    it('should expose a .setControllerImport property', () => {
        expect(MS.setControllerImport).toBeDefined();
        expect(typeof MS.setControllerImport).toBe('function');
        expect(MS.setControllerImport()).toEqual(MS);
    });

    it('should expose a .getControllerImport property', () => {
        expect(MS.getControllerImport).toBeDefined();
        expect(typeof MS.getControllerImport).toBe('function');
    });

    it('should expose a .setStylesImport property', () => {
        expect(MS.setStylesImport).toBeDefined();
        expect(typeof MS.setStylesImport).toBe('function');
        expect(MS.setStylesImport()).toEqual(MS);
    });

    it('should expose a .getStylesImport property', () => {
        expect(MS.getStylesImport).toBeDefined();
        expect(typeof MS.getStylesImport).toBe('function');
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


    describe('#setControllerImport()', () => {

        let testCallback = () => {};

        it('should set given ControllerImport callback or ignore if not callback', () => {
            MS.setControllerImport(testCallback);
            expect(MS.getControllerImport()).toEqual(testCallback);

            MS.setControllerImport('invalid');
            expect(MS.getControllerImport()).toEqual(null);

            MS.setControllerImport(null);
            expect(MS.getControllerImport()).toEqual(null);
        });

    });

    describe('#setStylesImport()', () => {

        let testCallback = () => {};

        it('should set given StylesImport callback or ignore if not callback', () => {
            MS.setStylesImport(testCallback);
            expect(MS.getStylesImport()).toEqual(testCallback);

            MS.setStylesImport('invalid');
            expect(MS.getStylesImport()).toEqual(null);

            MS.setStylesImport(null);
            expect(MS.getStylesImport()).toEqual(null);
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

});