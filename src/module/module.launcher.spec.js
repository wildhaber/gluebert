import { ModuleLauncher } from './module.launcher';
import { DataObserver } from '../data/data.observer';
import { ElementBuilder } from '../element/element.builder';
import { ModuleSignature } from './module.signature';

describe(`ModuleLauncher`, () => {

    const DO = new DataObserver();
    const EB = new ElementBuilder();

    const ML = new ModuleLauncher([
        new ModuleSignature('module.test', '.module-selector'),
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

});