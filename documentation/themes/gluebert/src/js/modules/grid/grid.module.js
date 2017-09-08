import { ModuleSignature } from './../../../../../../../src/module/module.signature';

/**
 * ModuleSignature for grid
 * @type {ModuleSignature}
 */
const GRID_MODULE = new ModuleSignature(`grid`, `.c-grid`)
    // .setImportController(() => import('./grid.controller').then((controller) => controller.GridController))
    .setImportStyles(() => import('./grid.styles.scss'));

export {
    GRID_MODULE,
};