import { ModuleSignature } from 'gluebert/module';

/**
 * ModuleSignature for BallBucket
 * @type {ModuleSignature}
 */
const BALL_BUCKET_MODULE = new ModuleSignature(`BallBucket`, `[data-ball-bucket]`)
    .setImportController(() => import('./ball-bucket.controller').then((controller) => controller.BallBucketController))
    .setImportStyles(() => import('./ball-bucket.styles.scss'));

export {
    BALL_BUCKET_MODULE,
};