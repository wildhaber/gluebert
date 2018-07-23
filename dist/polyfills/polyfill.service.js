function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class Polyfill {

    constructor() {}

    fill() {
        var _this = this;

        return _asyncToGenerator(function* () {
            return yield Promise.all([_this._documentFragment(), _this._intersectionObserver()]);
        })();
    }

    _documentFragment() {
        return _asyncToGenerator(function* () {
            if ('DocumentFragment' in window && window.DocumentFragment === document.createDocumentFragment().constructor) {
                return true;
            } else {
                return yield new Promise(resolve => {
                    require.ensure([], require => {
                        resolve(require('./polyfill.document-fragment'));
                    });
                });
            }
        })();
    }

    _intersectionObserver() {
        return _asyncToGenerator(function* () {
            if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window) {
                return true;
            } else {
                return yield new Promise(resolve => {
                    require.ensure([], require => {
                        resolve(require('./polyfill.intersection-observer'));
                    });
                });
            }
        })();
    }

}

export { Polyfill };