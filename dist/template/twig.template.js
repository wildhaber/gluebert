import { TemplateAbstract } from './template.abstract';

/**
 * Class represents TwigTemplate
 */
class TwigTemplate extends TemplateAbstract {

    /**
     * creates a new TwigTemplate
     * @param {function} engine
     */
    constructor(engine) {
        super(engine);
    }

    /**
     * creates a new twig view
     * @param {string} template
     * @return {function}
     */
    createView(template) {
        return this.engine.twig({
            data: template
        });
    }

    /**
     * render view
     * @param {function} view
     * @param {object} data
     * @return {string}
     */
    render(view, data) {
        return view.render(data);
    }

}

export { TwigTemplate };