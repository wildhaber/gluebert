import {DataSignature} from './../../../../../../data';

/**
 * DataSignature for BallsData
 * @type {DataSignature}
 */
const SIGNATURE = new DataSignature(
    'balls.data',
    (dataPool) => {
        return import(/* webpackChunkName: "balls.data" */ './balls.data')
            .then((module) => {
                return new module.BallsData(dataPool);
            });
    }
);

export {
    SIGNATURE,
}