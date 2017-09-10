import { ModuleSignature } from 'gluebert/module';

/**
 * ModuleSignature for lazy img
 * @type {ModuleSignature}
 */
const LAZY_IMG_MODULE = new ModuleSignature(`lazy-img`, `.c-lazy-img`)
    .setImportController(() => import('./lazy-img.controller').then((controller) => controller.LazyImgController))
    .setImportStyles(() => import('./lazy-img.styles.scss'));

export {
    LAZY_IMG_MODULE,
};