import { ModuleSignature } from './../../../../../../module';

/**
 * ModuleSignature for BallBucket
 * @type {ModuleSignature}
 */
const MODULE = new ModuleSignature(`BallBucket`, `[data-ball-bucket]`)
    .setImportController(() => import('./ball-bucket.controller').then((controller) => controller.BallBucketController))
    .setImportStyles(() => import('./ball-bucket.styles.scss'));

export {
    MODULE,
};