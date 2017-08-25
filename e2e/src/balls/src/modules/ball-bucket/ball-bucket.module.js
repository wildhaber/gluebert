import {ModuleSignature} from './../../../../../../module';

/**
 * ModuleSignature for BallBucket
 * @type {ModuleSignature}
 */
const MODULE = new ModuleSignature(`BallBucket`, `[data-ball-bucket]`)
    .setControllerImport(() => import('./ball-bucket.controller').then((controller) => controller.BallBucketController ))
    .setStylesImport(() => import('./ball-bucket.styles.scss'));

export {
    MODULE,
}