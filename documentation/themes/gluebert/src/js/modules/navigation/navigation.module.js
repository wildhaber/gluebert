import { ModuleSignature } from 'gluebert/module';

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