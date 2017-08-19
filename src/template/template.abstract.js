/**
 * Class represents TemplateAbstract
 */
class TemplateAbstract {

    /**
     * create TemplateAbstract instance
     * @param {function} engine - template engine
     * */
    constructor(engine) {
        this.engine = engine;
    }

    /**
     * create view
     */
    createView() {
        throw new Error(`Template engine must provide a .createView() method`);
    }

    /**
     * actual render function of the template and the data
     * @param data
     */
    render(data) {
        throw new Error(`Template engine must provide a .render() method`);
    }

}

export {
    TemplateAbstract,
}