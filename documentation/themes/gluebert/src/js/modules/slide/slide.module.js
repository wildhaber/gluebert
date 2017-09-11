import { ModuleSignature } from 'gluebert/module';

/**
 * ModuleSignature for slide
 * @type {ModuleSignature}
 */
const SLIDE_MODULE = new ModuleSignature(`slide`, `.c-slide`)
    .setImportStyles(() => import('./slide.styles.scss'));

export {
    SLIDE_MODULE,
};