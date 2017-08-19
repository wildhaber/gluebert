import {TemplateAbstract} from './template.abstract';

/**
 * Class represents HandlebarsTemplate
 */
class HandlebarsTemplate extends TemplateAbstract {

    /**
     * creates a new HandlebarsTemplate
     * @param {function} engine - template engine
     */
    constructor(engine) {
        super(engine);
    }

    /**
     * creates a new hbs view
     * @param {string} template
     * @return {function}
     */
    createView(template) {
        return this.engine.compile(template);
    }

    /**
     * render view
     * @param {function} view
     * @param {object} data
     * @return {string}
     */
    render(view, data) {
        return view(data);
    }

}

export {
    HandlebarsTemplate,
}