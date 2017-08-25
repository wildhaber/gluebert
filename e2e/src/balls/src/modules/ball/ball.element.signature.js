import {ElementSignature} from './../../../../../../element';

/**
 * Ball Element
 */
const BALL_ELEMENT_SIGNATURE = new ElementSignature('ball.element', () => import('./ball.template.html'))
    .setImportSchema(() => import('./ball.schema.json'))
    .setElementImport(() => import('./ball.element').then((module) => module.BallElement))
;

export {
    BALL_ELEMENT_SIGNATURE,
}