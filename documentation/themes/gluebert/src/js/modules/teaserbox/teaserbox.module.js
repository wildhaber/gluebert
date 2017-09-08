import { ModuleSignature } from './../../../../../../../src/module/module.signature';

/**
 * ModuleSignature for teaserbox
 * @type {ModuleSignature}
 */
const TEASERBOX_MODULE = new ModuleSignature(`teaserbox`, `.c-teaserbox`)
    // .setImportController(() => import('./teaserbox.controller').then((controller) => controller.TeaserboxController))
    .setImportStyles(() => import('./teaserbox.styles.scss'));

export {
    TEASERBOX_MODULE,
};