import { ModuleSignature } from 'gluebert/module';

/**
 * ModuleSignature for teaserboxgrid
 * @type {ModuleSignature}
 */
const TEASERBOXGRID_MODULE = new ModuleSignature(`teaserboxgrid`, `.c-teaserboxgrid`)
    .setImportStyles(() => import('./teaserboxgrid.styles.scss'));

export {
    TEASERBOXGRID_MODULE,
};