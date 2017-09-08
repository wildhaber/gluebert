import { ElementSignature } from 'gluebert/element';

/**
 * Ball Element
 */
const BALL_ELEMENT_SIGNATURE = new ElementSignature(
    'ball.element',
    () => import('./ball.template.twig'),
);

export {
    BALL_ELEMENT_SIGNATURE,
};