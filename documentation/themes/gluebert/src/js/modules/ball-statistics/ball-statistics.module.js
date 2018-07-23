import { ModuleSignature } from 'gluebert/module';
import { BALL_STATISTICS_ELEMENT_SIGNATURE } from './ball-statistics.element.signature';
import { BALL_STATISTICS_TICK_ELEMENT_SIGNATURE } from './ball-statistics.tick.element.signature';

/**
 * ModuleSignature for BallStatistics
 * @type {ModuleSignature}
 */
const BALL_STATISTICS_MODULE = new ModuleSignature(`BallStatistics`)

    // Set Selector
    .setSelector(`[data-ball-statistics]`)

    // Set ModuleImport
    .setImportController(() => import('./ball-statistics.controller').then((controller) => controller.BallStatisticsController))

    // Set StylesImport
    .setImportStyles(() => import('./ball-statistics.styles.scss'))

    // Add Ball Statistics Element
    .addElementSignature(BALL_STATISTICS_ELEMENT_SIGNATURE)

    // Add Ball Statistics Tick Element
    .addElementSignature(BALL_STATISTICS_TICK_ELEMENT_SIGNATURE);

export {
    BALL_STATISTICS_MODULE,
};