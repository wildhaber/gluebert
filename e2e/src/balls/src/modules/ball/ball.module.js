import { ModuleSignature } from './../../../../../../module';
import { BALL_ELEMENT_SIGNATURE } from './ball.element.signature';

/**
 * ElementSignature for ball.controller
 * @type {ModuleSignature}
 */
const MODULE = new ModuleSignature('Ball')

// set selector
    .setSelector(`li.ball`)

    // set ball controller
    .setControllerImport(() => import(/* webpackChunkName: "ball.controller" */ './ball.controller').then((controller) => controller.BallController))

    // set styles import
    .setStylesImport(() => import(/* webpackChunkName: "ball.styles" */ './ball.styles.scss'))

    // add Ball Element signature
    .addElementSignature(BALL_ELEMENT_SIGNATURE);

export {
    MODULE,
};