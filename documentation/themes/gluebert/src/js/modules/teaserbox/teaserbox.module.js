import { ModuleSignature } from 'gluebert/module';

/**
 * ModuleSignature for teaserbox
 * @type {ModuleSignature}
 */
const TEASERBOX_MODULE = new ModuleSignature(`teaserbox`, `.c-teaserbox`)
    .setImportStyles(() => import('./teaserbox.styles.scss'));

export {
    TEASERBOX_MODULE,
};