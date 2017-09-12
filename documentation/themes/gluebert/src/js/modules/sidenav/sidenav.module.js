import { ModuleSignature } from 'gluebert/module';

/**
 * ModuleSignature for sidenav
 * @type {ModuleSignature}
 */
const SIDENAV_MODULE = new ModuleSignature(`sidenav`, `.c-sidenav`)
    .setImportStyles(() => import('./sidenav.styles.scss'));

export {
    SIDENAV_MODULE,
};