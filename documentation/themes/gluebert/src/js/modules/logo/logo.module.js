import { ModuleSignature } from 'gluebert/module';

/**
 * ModuleSignature for logo
 * @type {ModuleSignature}
 */
const LOGO_MODULE = new ModuleSignature(`logo`, `.c-logo`)
    .setImportStyles(() => import('./logo.styles.scss'));

export {
    LOGO_MODULE,
};