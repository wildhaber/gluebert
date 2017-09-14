import { DependencyManager } from './module.dependency';

describe(`DependencyManager`, () => {

    const DM = new DependencyManager();

    it('should exist', () => {
        expect(typeof DependencyManager).toBe('function');
    });

    it('should have a constructor method defined', () => {
        expect(DM.constructor).toBeDefined();
        expect(typeof DM.constructor).toBe('function');
    });

    it('should have a _dependencies property defined', () => {
        expect(DM._dependencies).toBeDefined();
    });

    it('should have a _resolvedDependencies property defined', () => {
        expect(DM._resolvedDependencies).toBeDefined();
    });

    it('should have a _scope property defined', () => {
        expect(DM._scope).toBeDefined();
    });

    describe('#isValid()', () => {

        it('should validate, if a given key, module pair is valid', () => {
            expect(DM.isValid('key', () => {
            })).toBe(true);
            expect(DM.isValid('key')).toBe(false);
            expect(DM.isValid()).toBe(false);
            expect(DM.isValid(() => {
            })).toBe(false);
            expect(DM.isValid(null, () => {
            })).toBe(false);
            expect(DM.isValid(true, true)).toBe(false);
        });

    });

    describe('#add()', () => {

        it('should return this scope', () => {
            expect(DM.add('key', () => {
            })).toEqual(DM);
        });

        it('should add a given key, module pair to dependencies', () => {

            const fn = () => {
            };

            DM.add('key1');
            DM.add('key2', fn);
            expect(DM._dependencies.key1).toBeUndefined();
            expect(DM._dependencies.key2).toEqual(fn);
        });

    });

    describe('#hasDependencies()', () => {

        const EmptyDM = new DependencyManager();
        const FilledDM = new DependencyManager();

        FilledDM.add('key', () => {
        });
        FilledDM.add('key2', () => {
        });
        FilledDM.add('key3', () => {
        });
        FilledDM.add('keyduplicate', () => {
        });
        FilledDM.add('keyduplicate', () => {
        });

        it('return a boolean to check if dependencies are added', () => {
            expect(FilledDM.hasDependencies()).toBe(true);
            expect(EmptyDM.hasDependencies()).toBe(false);
        });


    });

    describe('#resolve()', () => {

        const FilledDM = new DependencyManager();

        FilledDM.add('key', () => 'foo');
        FilledDM.add('key2', () => 'bar');
        FilledDM.add('key3', () => 'some');
        FilledDM.add('keyduplicate', () => 'thing');

        it('should set the _resolvedDependencies', () => {
            expect(() => {
                FilledDM.resolve();
            }).not.toThrowError();
        });

    });


    describe('#inject()', () => {

        const baseScope = new (function() {
            this.reserved = true;
        });

        const baseScope2 = new (function() {
            this.reserved = true;
        });

        const baseScope3 = new (function() {
            this.reserved = true;
        });

        const deps = {
            $dep1: 'yay',
            $dep2: 'hurray',
        };

        const InjectDM = new DependencyManager();
        const InjectDMNoDep = new DependencyManager();

        InjectDM._dependencies = deps;

        InjectDM._resolvedDependencies = deps;
        InjectDMNoDep._resolvedDependencies = deps;

        InjectDM.inject(baseScope);
        InjectDMNoDep.inject(baseScope2);

        const DMInjectFailing = new DependencyManager();
        const deps2 = {
            reserved: 'oops',
        };

        DMInjectFailing._dependencies = deps2;
        DMInjectFailing._resolvedDependencies = deps2;


        it('should inject dm to a given scope and make them available', () => {
            expect(baseScope.$dep1).toBe('yay');
            expect(baseScope.$dep2).toBe('hurray');
        });

        it('should ignore if no dependencies are defined', () => {
            expect(baseScope2.$dep1).toBeUndefined();
            expect(baseScope2.$dep2).toBeUndefined();
        });

        it('should throw an error if a dependency key is called the same way as a local property', () => {

            expect(() => { DMInjectFailing.inject(baseScope3); }).toThrowError();

        });

    });


});