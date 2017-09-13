import { DataSignature } from 'gluebert/data';

/**
 * DataSignature for BallsData
 * @type {DataSignature}
 */
const SIGNATURE = new DataSignature(
    'balls.data',
    () => import('./balls.data').then((data) => data.BallsData),
);

export {
    SIGNATURE,
};