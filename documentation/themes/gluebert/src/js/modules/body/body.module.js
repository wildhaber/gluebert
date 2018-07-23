import { ModuleSignature } from 'gluebert/module';

/**
 * ModuleSignature for Body
 * @type {ModuleSignature}
 */
const BODY_MODULE = new ModuleSignature(`body`, `.c-body`)
    .setImportStyles(() => import('./body.styles.scss'));

export {
    BODY_MODULE,
};