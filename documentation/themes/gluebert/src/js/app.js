const dynamicLoad = [
    import('./../../../../../src/gluebert').then((m) => m.Gluebert),
    import('./modules').then((m) => m.MODULES),
    import('./data').then((m) => m.DATA),
    import('gluebert/template').then((m) => m.TwigTemplate),
    import('twig').then((m) => m),
];

Promise
    .all(dynamicLoad)
    .then(([Gluebert, Modules, Data, Template, TwigCore]) => {

        const glubby = new Gluebert(Modules, Data)
            .setTemplateEngine(new Template(TwigCore));

        return glubby.start();
    });
