import { ModuleSignature } from 'gluebert/module';

/**
 * ModuleSignature for code
 * @type {ModuleSignature}
 */
const CODE_MODULE = new ModuleSignature(`code`, `pre > code[class^='language-']`)
    .setImportController(() => import('./code.controller').then((controller) => controller.CodeController))
    .setImportStyles(() => import('./code.styles.scss'));

export {
    CODE_MODULE,
};