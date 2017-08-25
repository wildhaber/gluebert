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
     */
    constructor(signatures, templateEngine, schemaValidator) {
        this._schemaValidator = (schemaValidator) ? new schemaValidator() : null;
        this._templateEngine = (typeof templateEngine === 'object') ? templateEngine : null;
        this._signatures = this._transformToObject(signatures);
        this._elements = {};
    }

    /**
     * transform signatures array to {name: signature} object
     * @param {ElementSignature[]} signatures
     * @returns {object}
     * @private
     */
    _transformToObject(signatures) {
        let obj = {};
        signatures.forEach((signature) => {
            obj[signature.name] = signature;
        });
        return obj;
    }

    /**
     * checks if element exists
     * @param {ElementSignature.<name>} name
     * @return {boolean}
     * @private
     */
    _elementExists(name) {
        return (typeof this._elements[name] === 'object');
    }

    /**
     * get registered element
     * @param {ElementSignature.<name>} name
     * @return {object|null}
     */
    getElement(name) {
        return (typeof this._elements[name] === 'object') ? this._elements[name] : null;
    }

    /**
     * get signature
     * @param {ElementSignature.<name>} name
     * @return {object|null}
     */
    getSignature(name) {
        return (typeof this._signatures[name] === 'object') ? this._signatures[name] : null;
    }

    /**
     * remove signature from registry
     * @param {ElementSignature.<name>} name
     * @return {ElementBuilder}
     */
    removeSignature(name) {
        if(this._signatureExists(name)) {
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
        return (typeof this._signatures[name] === 'object');
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
        if(signature) {
            this._signatures[name].busy = true;
        }
        return this;
    }

    /**
     * get template element HTMLElement Node
     * @param {string|function} template - Template string or render function
     * @param {*} data - data
     * @return {Node}
     */
    getTemplateElement(template, data) {
        const templateElement = document.createElement('template');

        templateElement.innerHTML = (
            this._templateEngine &&
            typeof this._templateEngine === 'object' &&
            typeof this._templateEngine.render === 'function'
        )
            ? this._templateEngine.render(template, data)
            : template;

        return templateElement.content;
    }

    /**
     * get schema reference
     * @param {ElementSignature.<name>} name
     * @return {object}
     */
    getSchema(name) {
        const element = this.getElement(name);
        return (element) ? element.schema : null;
    }

    /**
     * validate data against schema
     * @param {ElementSignature.<name>} elementName
     * @param {*} data
     * @return {boolean}
     * @private
     */
    _validate(elementName, data) {
        const schema = this.getSchema(elementName);

        if(
            this._schemaValidator &&
            schema
        ) {
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

        const templateView = (
            this._templateEngine &&
            typeof this._templateEngine === 'object'
        )
            ? this._templateEngine.createView(template)
            : template;

        this._elements[name] = {
            schema,
            template: templateView,
            module,
        };

        return this;
    }

    /**
     * loads dependency creates element by name and data
     * @param {ElementSignature.<name>} name
     * @param {*} data
     * @return {Promise}
     */
    async create(name, data) {
        if(this._elementExists(name)) {
            if(this._validate(name, data)) {

                const element = this.getElement(name, data);

                const elementInstance = new element.module(
                    data,
                    this.getTemplateElement(element.template, data)
                );

                // IE >= 11 has problems somewhere here. - any help welcome.
                return elementInstance.create();
            } else {
                throw new Error(`Create Element ${name} failed. Given data do not match given schema.`);
            }
        } else if(
            this._signatureExists(name) &&
            !this.isBusySignature(name)
        ) {
            const signature = this.getSignature(name);
            this.setBusySignature(name);

            return await Promise.all([
                signature.schemaImport(),
                signature.templateImport(),
                signature.elementImport(),
            ])
                .then((imports) => {
                    this.addElement(name, imports[0], imports[1], imports[2]);

                    if(this._elementExists(name)) {
                        this.removeSignature(name);
                        console.log(this.create);
                        return this.create(name, data);
                    } else {
                        throw new Error(`Unfortunately Element ${name} could not have been instanciated.`);
                    }
                })
                .catch((err) => {
                    console.log(err.stack);
                    console.log(err.description);
                    console.log(err.message);
                    throw new Error(`Unfortunately Element ${name} could not have been instanciated. ${err}`);
                });
        } else if(
            this._signatureExists(name) &&
            this.isBusySignature(name)
        ) {
            return new Promise((resolve) => {
                window.setTimeout(() => {
                    resolve(this.create(name, data));
                }, 100);
            });
        } else {
            throw new Error(`Element ${name} is not have registered.`);
        }
    }

}

export {
    ElementBuilder,
};
