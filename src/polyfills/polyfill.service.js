class Polyfill {

    constructor() {

    }

    async fill() {
        return await Promise.all([
            this._documentFragment(),
            this._intersectionObserver(),
        ]);
    }

    async _documentFragment() {
        if(
            'DocumentFragment' in window &&
            window.DocumentFragment === document.createDocumentFragment().constructor
        ) {
            return true;
        } else {
            return await import('./polyfill.document-fragment');
        }
    }

    async _intersectionObserver() {
        if(
            'IntersectionObserver' in window &&
            'IntersectionObserverEntry' in window
        ) {
            return true;
        } else {
            return await import('./polyfill.intersection-observer');
        }
    }

}

export {
    Polyfill,
}