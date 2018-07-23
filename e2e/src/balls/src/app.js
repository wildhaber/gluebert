const dynamicLoad = [
    import(/* webpackChunkName: 'core/gluebert' */ './../../../../dist/gluebert').then((m) => m.Gluebert),
    import('./modules/modules').then((m) => m.MODULES),
    import('./data/data').then((m) => m.DATA),
    import(/* webpackChunkName: 'template/twig' */ './../../../../template').then((m) => m.TwigTemplate),
//    import(/* webpackChunkName: 'template/handlebars' */ './core/template/handlebars.template').then((m) => m.HandlebarsTemplate),
//    import(/* webpackChunkName: 'template/mustache' */ './core/template/mustache.template').then((m) => m.MustacheTemplate),
    import(/* webpackChunkName: 'jsonschema/ajv' */ 'ajv').then((m) => m),
//    import(/* webpackChunkName: 'template/handlebars/core' */ 'handlebars').then((m) => m),
//    import(/* webpackChunkName: 'template/mustache/core' */ 'mustache').then((m) => m),
    import(/* webpackChunkName: 'template/twig/core' */ 'twig').then((m) => m),
];

Promise
    .all(dynamicLoad)
    .then(([Gluebert, MODULES, DATA, Template, JSONSchema, TwigCore]) => {

        const glubby = new Gluebert(MODULES, DATA)
            .setSchemaValidator(JSONSchema)
            .setTemplateEngine(new Template(TwigCore))
        ;

        return glubby.start();

    });
