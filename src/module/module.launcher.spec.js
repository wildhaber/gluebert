import { ModuleLauncher } from './module.launcher';
import { DataObserver } from '../data/data.observer';
import { ElementBuilder } from '../element/element.builder';
import { ModuleSignature } from './module.signature';
import { PolyfillService } from './../polyfills/polyfill.service';

describe(`ModuleLauncher`, () => {

    const DO = new DataObserver();
    const EB = new ElementBuilder();
    const MS = new ModuleSignature('module.test', '.module-selector');

    const MSWithEverything = new ModuleSignature('module.test', '.module-selector')
        .setImportController('element', () => {
        })
        .addDependency('$dep1', () => {
        });

    const ML = new ModuleLauncher([
        MS,
    ], DO, EB);

    it(`should exist`, () => {
        expect(ModuleLauncher).toBeDefined();
    });

    it(`should have a constructor`, () => {
        expect(ML.constructor).toBeDefined();
    });

    it(`should have a _modules property defined`, () => {
        expect(ML._modules).toBeDefined();
    });

    it(`should have a _dataObserver property defined`, () => {
        expect(ML._dataObserver).toBeDefined();
    });

    it(`should have a _elementBuilder property defined`, () => {
        expect(ML._elementBuilder).toBeDefined();
    });

    it(`should have an _observerDomMutation method instanciated`, () => {
        expect(ML._observeDomMutation).toBeDefined();
    });

    it(`should have an _observer method instanciated`, () => {
        expect(ML._observer).toBeDefined();
        expect(ML._observer instanceof MutationObserver).toBe(true);
    });

    it(`should have an _instanceMap property defined`, () => {
        expect(ML._instanceMap).toBeDefined();
        expect(ML._instanceMap instanceof Map).toBe(true);
    });

    it(`should have an _stylesLoaded property defined`, () => {
        expect(ML._stylesLoaded).toBeDefined();
        expect(ML._stylesLoaded instanceof Set).toBe(true);
    });

    it(`should have an _stylesLoaded property defined`, () => {
        expect(ML._stylesLoaded).toBeDefined();
        expect(ML._stylesLoaded instanceof Set).toBe(true);
    });

    describe(`#_addInstance()`, () => {

        const el = Element;
        const fn = () => true;

        it(`should register a controller instance to map`, () => {
            ML._addInstance(el, fn);
            expect(ML._instanceMap.get(el)).toEqual(fn);
        });
    });

    describe(`#_destructInstance()`, () => {

        var ranThrough = false;
        const el = document.createElement('div');
        const fn = () => {
            return {
                destruct: () => {
                    ranThrough = true;
                },
            };
        };

        it(`should run destruct method of a controller and removes it from the map`, () => {
            ML._addInstance(el, fn());
            ML._destructInstance(el);
            expect(ranThrough).toBe(true);
            expect(ML._instanceMap.get(el)).toBeUndefined();
        });
    });

    describe(`#_bindController`, () => {
        it('should not throw an error', () => {
            expect(() => ML._bindController()).not.toThrowError();
            expect(() => ML._bindController(document.createElement('div'), MS)).not.toThrowError();
            expect(() => ML._bindController(document.createElement('div'), MSWithEverything)).not.toThrowError();
        });
    });

    describe(`#_wokeUpElements`, () => {
        it('should not throw an error', () => {
            expect(() => ML._wokeUpElements([])).not.toThrowError();
        });
    });

    describe(`#_addAsSleeper`, () => {
        it('should not throw an error', () => {
            expect(() => ML._addAsSleeper([{

            }], MS)).not.toThrowError();
        });
    });

    describe(`#_addStyles`, () => {
        it('should not throw an error', () => {
            expect(() => ML._addStyles([{

            }], () => {})).not.toThrowError();
        });
    });

    describe(`#_batchPaint`, () => {
        it('should not throw an error', () => {
            expect(() => ML._batchPaint([{

            }], () => {})).not.toThrowError();
        });
    });

});