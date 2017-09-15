import { ModuleSignature } from 'gluebert/module';

/**
 * ModuleSignature for icon
 * @type {ModuleSignature}
 */
const ICON_MODULE = new ModuleSignature(`icon`, `.c-icon`)
    .setImportStyles(() => import('./icon.styles.scss'))
    .disableLazy();

export {
    ICON_MODULE,
};