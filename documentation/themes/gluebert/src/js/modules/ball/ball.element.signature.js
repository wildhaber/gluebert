import { ElementSignature } from 'gluebert/element';

/**
 * Ball Element
 */
const BALL_ELEMENT_SIGNATURE = new ElementSignature('ball.element', () => import('./ball.template.html'))
    .setImportSchema(() => import('./ball.schema.json'))
    .setImportElement(() => import('./ball.element').then((module) => module.BallElement))
;

export {
    BALL_ELEMENT_SIGNATURE,
};