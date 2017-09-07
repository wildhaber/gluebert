const dynamicLoad = [
    import('gluebert').then((m) => m.Gluebert),
    import('./modules').then((m) => m.MODULES),
];

Promise
    .all(dynamicLoad)
    .then(([Gluebert, Modules]) => {
        const glubby = new Gluebert(Modules, null);
        return glubby.start();
    });
