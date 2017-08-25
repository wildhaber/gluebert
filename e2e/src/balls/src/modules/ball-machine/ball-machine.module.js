import {ModuleSignature} from './../../../../../../module';

/**
 * ModuleSignature for BallMachine
 * @type {ModuleSignature}
 */
const MODULE = new ModuleSignature(`BallMachine`)

    // Set Selector
    .setSelector(`[data-ball-machine]`)

    // Set ModuleImport
    .setControllerImport(() => import(/* webpackChunkName: "ball.machine.controller" */ './ball-machine.controller').then((controller) => controller.BallMachineController ))

    // Set StylesImport
    .setStylesImport(() => import(/* webpackChunkName: "ball.machine.styles" */ './ball-machine.styles.scss'));


export {
    MODULE,
}