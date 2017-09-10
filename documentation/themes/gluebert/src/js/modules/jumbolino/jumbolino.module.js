import { ModuleSignature } from 'gluebert/module';

/**
 * ModuleSignature for jumbolino
 * @type {ModuleSignature}
 */
const JUMBOLINO_MODULE = new ModuleSignature(`jumbolino`, `.c-jumbolino`)
    .setImportStyles(() => import('./jumbolino.styles.scss'));

export {
    JUMBOLINO_MODULE,
};