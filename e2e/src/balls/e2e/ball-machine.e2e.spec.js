/*global fixture test:true*/

import { Selector } from 'testcafe';
import { Router } from './../../../helper';

/**
 * Define Fixture for Ball-Machine
 */
fixture(`balls.ball-machine`)
    .page(
        Router(`balls/index.html`),
    );

/**
 * Define Tests
 */
test('Balls are generated when pressing button', async t => {

    const ballMachine = await Selector(`div[data-ball-machine].gb-ready`, {
        timeout: 15000,
        visibilityCheck: true,
    });

    const balls = await Selector(`div[data-ball-machine].gb-ready`, {
        timeout: 15000,
        visibilityCheck: true,
    });

    await t
        .wait(10000)
        .click(ballMachine.find(`button[data-add-ball]`))
        .wait(2000)
        .expect(balls.find('.ball').count)
        .eql(1);

});