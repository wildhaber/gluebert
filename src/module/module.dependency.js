/**
 * Class representing DependencyManager
 */
class DependencyManager {

    /**
     * Creates instance of DependencyManager
     * @constructor
     */
    constructor() {
        this._dependencies = {};
        this._resolvedDependencies = {};
        this._scope = null;
    }

    /**
     * checks if dependency is valid
     * @param key
     * @param dependency
     * @return {boolean}
     */
    isValid(key, dependency) {
        return (
            typeof key === 'string' &&
            typeof dependency === 'function'
        );
    }

    /**
     * add dependency
     * @param {string} key
     * @param {function} dependency
     * @return {DependencyManager}
     */
    add(key, dependency) {
        if(this.isValid(key, dependency)) {
            this._dependencies[key] = dependency;
        }

        return this;
    }

    /**
     * resolve dependencies
     * @return {Promise}
     */
    async resolve() {
        const keys = Object.keys(this._dependencies);
        const resolved = await Promise.all(
            keys.map((depKey) => {
                return this._dependencies[depKey]();
            }),
        );

        keys.forEach((depKey, idx) => {
            this._resolvedDependencies[depKey] = resolved[idx];
        });

        return this;
    }

    /**
     * checks if valid
     * dependencies exists
     * @return {boolean}
     */
    hasDependencies() {
        return !!Object.keys(this._dependencies).length;
    }

    /**
     * inject dependencies to a given scope
     * and makes it accessible through
     * local properties
     * @return {DependencyManager}
     */
    inject(scope) {
        if(
            scope &&
            this.hasDependencies()
        ) {
            this._scope = scope;

            Object.keys(this._resolvedDependencies)
                .forEach((dependencyKey) => {

                    const dependency = this._resolvedDependencies[dependencyKey];

                    if(
                        typeof dependencyKey === 'string' &&
                        typeof scope[dependencyKey] === 'undefined'
                    ) {
                        scope[dependencyKey] = dependency;
                    } else if(typeof dependencyKey === 'string') {
                        throw new Error(`
                            Could not bind dependency '${dependencyKey}' property alread reserved by controller.
                            We recommend to work with a prefix convention like all dependencies have a $ sign prefixed
                            and become accessible by this.$dependencyKey.
                        `);
                    }
                });
        }
        return this;
    }

}

export {
    DependencyManager,
};