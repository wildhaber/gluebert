import {ElementSignature} from './../../../../../../element';

/**
 * Ball Statistics Element
 */
const BALL_STATISTICS_ELEMENT_SIGNATURE = new ElementSignature('ball.statistics.element', () => import('./ball-statistics.template.twig'))
    .setElementImport(() => import('./ball-statistics.element').then((module) => module.BallStatisticsElement))
;

export {
    BALL_STATISTICS_ELEMENT_SIGNATURE,
}