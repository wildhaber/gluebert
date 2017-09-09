import { ModuleSignature } from './../../../../../../../src/module/module.signature';

/**
 * ModuleSignature for navigation
 * @type {ModuleSignature}
 */
const NAVIGATION_MODULE = new ModuleSignature(`navigation`, `.c-navigation`)
    // .setImportController(() => import('./navigation.controller').then((controller) => controller.NavigationController))
    .setImportStyles(() => import('./navigation.styles.scss'));

export {
    NAVIGATION_MODULE,
};