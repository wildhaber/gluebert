import { ElementSignature } from 'gluebert/element';

/**
 * Ball Statistics Tick Element
 */
const BALL_STATISTICS_TICK_ELEMENT_SIGNATURE = new ElementSignature('ball.statistics.tick.element', () => import('./ball-statistics.tick.template.twig'));

export {
    BALL_STATISTICS_TICK_ELEMENT_SIGNATURE,
};