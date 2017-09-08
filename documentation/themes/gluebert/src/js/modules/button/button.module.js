import { ModuleSignature } from './../../../../../../../src/module/module.signature';

/**
 * ModuleSignature for navigation
 * @type {ModuleSignature}
 */
const BUTTON_MODULE = new ModuleSignature(`button`, `.c-button`)
    // .setImportController(() => import('./button.controller').then((controller) => controller.ButtonController))
    .setImportStyles(() => import('./button.styles.scss'));

export {
    BUTTON_MODULE,
};