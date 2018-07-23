function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
        return typeof key === 'string' && typeof dependency === 'function';
    }

    /**
     * add dependency
     * @param {string} key
     * @param {function} dependency
     * @return {DependencyManager}
     */
    add(key, dependency) {
        if (this.isValid(key, dependency)) {
            this._dependencies[key] = dependency;
        }

        return this;
    }

    /**
     * resolve dependencies
     * @return {Promise}
     */
    resolve() {
        var _this = this;

        return _asyncToGenerator(function* () {
            const keys = Object.keys(_this._dependencies);
            const resolved = yield Promise.all(keys.map(function (depKey) {
                return _this._dependencies[depKey]();
            }));

            keys.forEach(function (depKey, idx) {
                _this._resolvedDependencies[depKey] = resolved[idx];
            });

            return _this;
        })();
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
        if (scope && this.hasDependencies()) {
            this._scope = scope;

            Object.keys(this._resolvedDependencies).forEach(dependencyKey => {

                const dependency = this._resolvedDependencies[dependencyKey];

                if (typeof dependencyKey === 'string' && typeof scope[dependencyKey] === 'undefined') {
                    scope[dependencyKey] = dependency;
                } else if (typeof dependencyKey === 'string') {
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

export { DependencyManager };