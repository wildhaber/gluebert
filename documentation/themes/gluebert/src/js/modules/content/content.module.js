import { ModuleSignature } from 'gluebert/module';

/**
 * ModuleSignature for content
 * @type {ModuleSignature}
 */
const CONTENT_MODULE = new ModuleSignature(`content`, `.c-content`)
    .setImportStyles(() => import('./content.styles.scss'));

export {
    CONTENT_MODULE,
};