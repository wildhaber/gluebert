import { ModuleSignature } from 'gluebert/module';

/**
 * ModuleSignature for jumbo
 * @type {ModuleSignature}
 */
const JUMBO_MODULE = new ModuleSignature(`jumbo`, `.c-jumbo`)
    .setImportStyles(() => import('./jumbo.styles.scss'));

export {
    JUMBO_MODULE,
};