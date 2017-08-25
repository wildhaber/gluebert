/*global fixture test:true*/

import { Selector } from 'testcafe';
import { Router } from './helper';

/**
 * Define Fixture for TestSet
 */
fixture(`My fixture`)
    .page(
        Router(`demo.html`)
    );

/**
 * Define Tests
 */
test('My Test', async t => {
    await t
        .expect(Selector('.cool').innerText)
        .eql('Tadaaa...');
});