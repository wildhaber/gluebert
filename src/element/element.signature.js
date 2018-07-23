import { ElementAbstract } from './element.abstract';

/**
 * Class represents ElementSignature
 * @class
 * @example new ElementSignature('xyz.element', () => import('./xyz.template.twig'))
 * @example new ElementSignature('xyz.element', () => import('./xyz.template.html'))
 * @example new ElementSignature('xyz.element')
 */
class ElementSignature {

    /**
     * @param {string} name - name of the element usage will be referenced to this given name
     * @param {function|null} template - callback function for template import
     */
    constructor(name, template = null) {
        this.name = (typeof name === 'string')
            ? name
            : null;

        this.importSchema = () => Promise.resolve();
        this.importTemplate = () => Promise.resolve(`<div>Missing template specification for ${name}.</div>`);
        this.importElement = () => Promise.resolve(ElementAbstract);

        if(template) {
            this.setImportTemplate(template);
        }

    }

    /**
     * set import schema callback
     * @param {function} schema
     * @return {ElementSignature}
     * @example signature.setImportSchema(() => import('./xyz.schema.json'));
     */
    setImportSchema(schema) {
        if(typeof schema === 'function') {
            this.importSchema = schema;
        }
        return this;
    }

    /**
     * get import schema callback
     * @return {function|null}
     */
    getImportSchema() {
        return this.importSchema;
    }

    /**
     * set template import callback
     * @param {function} template
     * @return {ElementSignature}
     * @example signature.setImportTemplate(() => import('./xyz.template.html'));
     * @example signature.setImportTemplate(() => import('./xyz.template.twig'));
     */
    setImportTemplate(template) {
        if(typeof template === 'function') {
            this.importTemplate = template;
        }
        return this;
    }

    /**
     * get template import promise
     * @return {function|null}
     */
    getImportTemplate() {
        return this.importTemplate;
    }

    /**
     * set element import callback
     * @param {function} element
     * @return {ElementSignature}
     * @example signature.setImportElement(() => import('./xyz.element').then((element) => element.XyzElement));
     */
    setImportElement(element) {
        if(typeof element === 'function') {
            this.importElement = element;
        }
        return this;
    }

    /**
     * get element import callback
     * @return {function|null}
     */
    getImportElement() {
        return this.importElement;
    }
}

export {
    ElementSignature,
};