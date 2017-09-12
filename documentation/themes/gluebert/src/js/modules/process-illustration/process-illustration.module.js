import { ModuleSignature } from 'gluebert/module';

/**
 * ModuleSignature for process-illustration
 * @type {ModuleSignature}
 */
const PROCESS_ILLUSTRATION_MODULE = new ModuleSignature(`process-illustration`, `.c-process-illustration`)
    .setImportController(() => import('./process-illustration.controller').then((controller) => controller.ProcessIllustrationController))
    .setImportStyles(() => import('./process-illustration.styles.scss'));

export {
    PROCESS_ILLUSTRATION_MODULE,
};