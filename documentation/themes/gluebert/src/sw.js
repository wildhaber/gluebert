importScripts('/workbox.js');

const workboxSW = new WorkboxSW();

workboxSW.precache([
    {
        url: '/index.html',
        revision: 'index',
    },
    {
        url: '/404/index.html',
        revision: '404',
    },
    {
        url: '/offline/index.html',
        revision: 'offline',
    },
]);

// This will be replaced by webpack-plugin-workbox
workboxSW.precache([]);

const networkFirst = workboxSW.strategies.networkFirst();
workboxSW.router.registerRoute('/', networkFirst);