import { MODULE as BALL_MACHINE } from './ball-machine/ball-machine.module';
import { MODULE as BALL_BUCKET } from './ball-bucket/ball-bucket.module';
import { MODULE as BALL } from './ball/ball.module';
import { MODULE as BALL_STATISTICS } from './ball-statistics/ball-statistics.module';

/**
 * List of registrered Modules
 * @type {ModuleSignature[]}
 */
const MODULES = [
    BALL_MACHINE,
    BALL_BUCKET,
    BALL,
    BALL_STATISTICS,
];

export {
    MODULES,
};