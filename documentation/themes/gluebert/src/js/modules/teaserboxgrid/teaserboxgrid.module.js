import { ModuleSignature } from './../../../../../../../src/module/module.signature';

/**
 * ModuleSignature for teaserboxgrid
 * @type {ModuleSignature}
 */
const TEASERBOXGRID_MODULE = new ModuleSignature(`teaserboxgrid`, `.c-teaserboxgrid`)
    // .setImportController(() => import('./teaserboxgrid.controller').then((controller) => controller.TeaserboxgridController))
    .setImportStyles(() => import('./teaserboxgrid.styles.scss'));

export {
    TEASERBOXGRID_MODULE,
};