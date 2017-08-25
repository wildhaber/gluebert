import { Selector } from 'testcafe';
import { Router, Server } from './helper';

/**
 * Define Fixture for TestSet
 */
fixture(`My Second Test...`)
    .page(
        Router(`demo.html`)
    );

/**
 * Define Tests
 */
test('My Test', async t => {
    await t
        .expect(Selector('span:first-child').innerText)
        .eql('Gugus');
});