import { ModuleSignature } from 'gluebert/module';

/**
 * ModuleSignature for table
 * @type {ModuleSignature}
 */
const TABLE_MODULE = new ModuleSignature(`table`, `table`)
    .setImportStyles(() => import('./table.styles.scss'));

export {
    TABLE_MODULE,
};