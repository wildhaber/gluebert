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

    const GeneratorElement = Selector(`[data-ball-machine]`);

    await t
        .wait(2000)
        .click(GeneratorElement.find(`[data-add-ball]`))
        .wait(1000)
        .expect(GeneratorElement.find(`.ball`).count)
        .eql(1);
});