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

    await t
        .wait(15000)
        .click(Selector(`[data-ball-machine]`).find(`[data-add-ball]`))
        .wait(2000)
        .expect(Selector(`[data-ball-machine]`).find(`.ball`).count)
        .eql(1);
});