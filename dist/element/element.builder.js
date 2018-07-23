function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Class represents ElementBuilder
 * @class ElementBuilder
 */
class ElementBuilder {

    /**
     * Create ElementBuilder instance
     * @param {ElementSignature[]} signatures
     * @param {function} templateEngine
     * @param {function} schemaValidator
     * @param {object} options
     */
    constructor(signatures = [], templateEngine = null, schemaValidator = null, options = {}) {

        this._schemaValidator = schemaValidator && typeof schemaValidator === 'function' ? new schemaValidator() : null;

        this._templateEngine = typeof templateEngine === 'object' ? templateEngine : null;

        this._signatures = signatures instanceof Array ? this._transformToObject(signatures) : {};

        this._elements = {};

        this._options = options;
    }

    /**
     * transform signatures array to {name: signature} object
     * @param {ElementSignature[]} signatures
     * @returns {object}
     * @private
     */
    _transformToObject(signatures) {
        let obj = {};

        if (signatures instanceof Array) {
            signatures.forEach(signature => {
                if (signature && typeof signature.name === 'string') {
                    obj[signature.name] = signature;
                }
            });
        }

        return obj;
    }

    /**
     * checks if element exists
     * @param {ElementSignature.<name>} name
     * @return {boolean}
     * @private
     */
    _elementExists(name) {
        return !!name && typeof name === 'string' && typeof this._elements[name] === 'object' && !!this._elements[name];
    }

    /**
     * get registered element
     * @param {ElementSignature.<name>} name
     * @return {object|null}
     */
    getElement(name) {
        return this._elementExists(name) ? this._elements[name] : null;
    }

    /**
     * get signature
     * @param {ElementSignature.<name>} name
     * @return {object|null}
     */
    getSignature(name) {
        return this._signatureExists(name) ? this._signatures[name] : null;
    }

    /**
     * remove signature from registry
     * @param {ElementSignature.<name>} name
     * @return {ElementBuilder}
     */
    removeSignature(name) {
        if (this._signatureExists(name)) {
            delete this._signatures[name];
        }
        return this;
    }

    /**
     * checks if signature exists
     * @param {ElementSignature.<name>} name
     * @return {boolean}
     * @private
     */
    _signatureExists(name) {
        return typeof this._signatures[name] === 'object' && !!this._signatures[name] && typeof this._signatures[name].name === 'string';
    }

    /**
     * checks if signature is currently loading
     * @param {ElementSignature.<name>} name
     * @return {boolean}
     */
    isBusySignature(name) {
        let signature = this.getSignature(name);
        return !!(signature && signature.busy);
    }

    /**
     * sets busy flag to
     * @param {ElementSignature.<name>} name
     * @return {ElementBuilder}
     */
    setBusySignature(name) {
        let signature = this.getSignature(name);
        if (signature) {
            this._signatures[name].busy = true;
        }
        return this;
    }

    /**
     * get template innter html
     * @param {string} template
     * @param {object} data
     * @return {string}
     */
    getTemplateInnerHtml(template, data) {
        return this._templateEngine && typeof this._templateEngine === 'object' && typeof this._templateEngine.render === 'function' ? this._templateEngine.render(template, data) : template;
    }

    /**
     * get template without shadow dom support
     * @param {string} template
     * @param {object} data
     * @return {Node}
     * @private
     */
    getTemplateElement(template, data) {
        const templateFeature = 'content' in document.createElement('template');
        const templateElement = templateFeature ? document.createElement('template') : document.createDocumentFragment();

        templateElement.innerHTML = this.getTemplateInnerHtml(template, data);

        return templateFeature ? templateElement.content : templateElement;
    }

    /**
     * get schema reference
     * @param {ElementSignature.<name>} name
     * @return {object}
     */
    getSchema(name) {
        const element = this.getElement(name);
        return element && typeof element === 'object' && typeof element.schema !== 'undefined' ? element.schema : null;
    }

    /**
     * validate data against schema
     * @param {ElementSignature.<name>} elementName
     * @param {*} data
     * @return {boolean}
     * @private
     */
    _validate(elementName, data) {
        if (!this._elementExists(elementName)) {
            return false;
        }

        const schema = this.getSchema(elementName);

        if (this._schemaValidator && schema) {
            return this._schemaValidator.validate(schema, data);
        } else {
            return true;
        }
    }

    /**
     * adds element to registry
     * @param {ElementSignature.<name>} name
     * @param {object} schema
     * @param {string} template
     * @param {ElementAbstract} module
     * @return {ElementBuilder}
     */
    addElement(name, schema, template, module) {

        const templateView = this._templateEngine && typeof this._templateEngine === 'object' ? this._templateEngine.createView(template) : template;

        this._elements[name] = {
            schema,
            template: templateView,
            module
        };

        return this;
    }

    /**
     * generate element instance
     * @param {ElementSignature.<name>} name
     * @param {object} data
     * @private
     */
    _generateElement(name, data) {
        if (this._validate(name, data)) {
            const element = this.getElement(name, data);

            const elementInstance = new element.module(data, this.getTemplateElement(element.template, data));

            return elementInstance.create();
        } else {
            throw new Error(`Create Element ${name} failed. Given data do not match given schema.`);
        }
    }

    /**
     * load element module
     * @param {ElementSignature.<name>} name
     * @param {object} data
     * @return {Promise.<TResult>}
     * @private
     */
    _loadElementModule(name, data) {
        var _this = this;

        return _asyncToGenerator(function* () {
            const signature = _this.getSignature(name);
            _this.setBusySignature(name);

            return yield Promise.all([signature.importSchema(), signature.importTemplate(), signature.importElement()]).then(function (imports) {
                _this.addElement(name, imports[0], imports[1], imports[2]);

                if (_this._elementExists(name)) {
                    _this.removeSignature(name);
                    return _this.create(name, data);
                } else {
                    throw new Error(`Unfortunately Element ${name} could not have been instanciated.`);
                }
            }).catch(function (err) {
                throw new Error(`Unfortunately Element ${name} could not have been instanciated. ${err}`);
            });
        })();
    }

    /**
     * retry create element loop when
     * same element signature has to load
     * multiple times at the same time
     * @param {Elementsignature.<name>} name
     * @param {object} data
     * @return {Promise}
     * @private
     */
    _retryCreate(name, data) {
        return new Promise((resolve, reject) => {
            window.setTimeout(() => {
                try {
                    resolve(this.create(name, data));
                } catch (err) {
                    reject(err);
                }
            }, 100);
        });
    }

    /**
     * loads dependency creates element by name and data
     * @param {ElementSignature.<name>} name
     * @param {*} data
     * @return {Promise}
     */
    create(name, data) {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            try {
                const elementExists = _this2._elementExists(name);
                const signatureExists = _this2._signatureExists(name);
                const signatureIsBusy = _this2.isBusySignature(name);

                if (!elementExists && !signatureExists) {
                    return null;
                }

                if (elementExists) {
                    return _this2._generateElement(name, data);
                }

                return signatureExists && !signatureIsBusy ? _this2._loadElementModule(name, data) : _this2._retryCreate(name, data);
            } catch (err) {
                return null;
            }
        })();
    }

    /**
     * get options
     * @return {Object}
     */
    getOptions() {
        return this._options;
    }

    /**
     * get element ready class
     * @return {string|null} elementReadyClass
     */
    getElementReadyClass() {
        return typeof this._options.elementReadyClass === 'string' ? this._options.elementReadyClass : null;
    }

}

export { ElementBuilder };