import {TemplateAbstract} from './template.abstract';

/**
 * Class represents MustacheTemplate
 */
class MustacheTemplate extends TemplateAbstract {

    /**
     * creates a new MustacheTemplate
     * @param {function} engine - template engine
     */
    constructor(engine) {
        super(engine);
    }

    /**
     * creates a new mustache view
     * @param {string} template
     * @return {string}
     */
    createView(template) {
        return template;
    }

    /**
     * render view
     * @param {string} view
     * @param {object} data
     * @return {string}
     */
    render(view, data) {
        return this.engine.render(view, data);
    }

}

export {
    MustacheTemplate,
}