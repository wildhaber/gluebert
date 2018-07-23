import { ModuleSignature } from 'gluebert/module';

/**
 * ModuleSignature for process-illustration
 * @type {ModuleSignature}
 */
const PROCESS_ILLUSTRATION_MODULE = new ModuleSignature(`process-illustration`, `.c-process-illustration`)

    // Define Controller Import
    .setImportController(() => import('./process-illustration.controller').then((controller) => controller.ProcessIllustrationController))

    // Add Dependencies to inject
    .addDependency('$anime', () => import('animejs'))

    // Define import styles loader
    .setImportStyles(() => import('./process-illustration.styles.scss'));

export {
    PROCESS_ILLUSTRATION_MODULE,
};