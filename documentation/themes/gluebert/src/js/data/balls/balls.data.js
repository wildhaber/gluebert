import { DataAbstract } from 'gluebert/data';

/**
 * Class represents BallsData
 * @extends DataAbstract
 */
class BallsData extends DataAbstract {

    /**
     * create new BallData instance
     * @param {DataObserver} dataPool
     */
    constructor(dataPool) {
        super(dataPool);
    }

}

export {
    BallsData,
};