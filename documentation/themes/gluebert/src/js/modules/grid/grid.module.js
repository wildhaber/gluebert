import { ModuleSignature } from 'gluebert/module';

/**
 * ModuleSignature for grid
 * @type {ModuleSignature}
 */
const GRID_MODULE = new ModuleSignature(`grid`, `.c-grid`)
    .setImportStyles(() => import('./grid.styles.scss'));

export {
    GRID_MODULE,
};