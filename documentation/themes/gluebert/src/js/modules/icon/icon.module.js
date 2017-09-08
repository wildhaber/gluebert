import { ModuleSignature } from './../../../../../../../src/module/module.signature';

/**
 * ModuleSignature for icon
 * @type {ModuleSignature}
 */
const ICON_MODULE = new ModuleSignature(`icon`, `.c-icon`)
    // .setImportController(() => import('./icon.controller').then((controller) => controller.IconController))
    .setImportStyles(() => import('./icon.styles.scss'));

export {
    ICON_MODULE,
};