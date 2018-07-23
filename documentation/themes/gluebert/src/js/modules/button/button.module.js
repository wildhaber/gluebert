import { ModuleSignature } from 'gluebert/module';

/**
 * ModuleSignature for navigation
 * @type {ModuleSignature}
 */
const BUTTON_MODULE = new ModuleSignature(`button`, `.c-button`)
    .setImportStyles(() => import('./button.styles.scss'));

export {
    BUTTON_MODULE,
};