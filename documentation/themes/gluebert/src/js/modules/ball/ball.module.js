import { ModuleSignature } from 'gluebert/module';
import { BALL_ELEMENT_SIGNATURE } from './ball.element.signature';

/**
 * ElementSignature for ball.controller
 * @type {ModuleSignature}
 */
const BALL_MODULE = new ModuleSignature('Ball')

// set selector
    .setSelector(`li.ball`)

    // set ball controller
    .setImportController(() => import('./ball.controller').then((controller) => controller.BallController))

    // set styles import
    .setImportStyles(() => import('./ball.styles.scss'))

    // add Ball Element signature
    .addElementSignature(BALL_ELEMENT_SIGNATURE);

export {
    BALL_MODULE,
};