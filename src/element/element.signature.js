import {ElementAbstract} from './element.abstract';

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
        this.name = name;
        this.schemaImport = () => Promise.resolve();
        this.templateImport = () => Promise.resolve(`<div>Missing template specification for ${name}.</div>`);
        this.elementImport = () => Promise.resolve(ElementAbstract);

        if(template) {
            this.setTemplateImport(template);
        }

    }

    /**
     * set import schema callback
     * @param {function} schema
     * @return {ElementSignature}
     * @example signature.setImportSchema(() => import('./xyz.schema.json'));
     */
    setImportSchema(schema) {
        this.schemaImport = schema;
        return this;
    }

    /**
     * get import schema callback
     * @return {function|null}
     */
    getImportSchema() {
        return this.schemaImport;
    }

    /**
     * set template import callback
     * @param {function} template
     * @return {ElementSignature}
     * @example signature.setTemplateImport(() => import('./xyz.template.html'));
     * @example signature.setTemplateImport(() => import('./xyz.template.twig'));
     */
    setTemplateImport(template) {
        this.templateImport = template;
        return this;
    }

    /**
     * get template import promise
     * @return {function|null}
     */
    getTemplateImport() {
        return this.templateImport;
    }

    /**
     * set element import callback
     * @param {function} element
     * @return {ElementSignature}
     * @example signature.setElementImport(() => import('./xyz.element').then((element) => element.XyzElement));
     */
    setElementImport(element) {
        this.elementImport = element;
        return this;
    }

    /**
     * get element import callback
     * @return {function|null}
     */
    getElementImport() {
        return this.elementImport;
    }
}

export {
    ElementSignature,
}