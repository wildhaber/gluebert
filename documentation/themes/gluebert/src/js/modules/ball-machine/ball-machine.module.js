import { ModuleSignature } from 'gluebert/module';

/**
 * ModuleSignature for BallMachine
 * @type {ModuleSignature}
 */
const BALL_MACHINE_MODULE = new ModuleSignature(`BallMachine`)

    // Set Selector
    .setSelector(`[data-ball-machine]`)

    // Set ModuleImport
    .setImportController(() => import(/* webpackChunkName: "ball.machine.controller" */ './ball-machine.controller').then((controller) => controller.BallMachineController))

    // Set StylesImport
    .setImportStyles(() => import(/* webpackChunkName: "ball.machine.styles" */ './ball-machine.styles.scss'));


export {
    BALL_MACHINE_MODULE,
};