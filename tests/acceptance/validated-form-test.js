/* globals visit, fillIn, click, andThen, currentURL, findWithAssert */
import { module, test } from 'qunit';
import { visit, click, currentURL, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | validated form sample', function(hooks) {
  setupApplicationTest(hooks);

  const REQUIRED_ERROR_MESSAGE = 'Email address is required';
  const INVALID_ERROR_MESSAGE = 'Enter a valid email';
  const SUCCESS_MESSAGE = 'Form saved';

  test('visiting /', async function(assert) {
    await visit('/');
    assert.equal(currentURL(), '/');
  });

  test('clicking save before field is populated results in a validation error', async function(assert) {
    await visit('/');
    await click('button');
    assert.equal(this.element.querySelector('.error').textContent, REQUIRED_ERROR_MESSAGE), 'Required validation error message is displayed';
  });

  test('clicking save with invalid email results in a validation error', async function(assert) {
    await visit('/');
    await fillIn('input', 'abc');
    await click('button');
    assert.equal(this.element.querySelector('.error').textContent, INVALID_ERROR_MESSAGE, 'Invalid email validation error message is shown');
  });

  test('modifying the property clears the validation error', async function(assert) {
    await visit('/');
    await fillIn('input', 'abc');
    await click('button');
    assert.equal(this.element.querySelector('.error').textContent, INVALID_ERROR_MESSAGE);
    await fillIn('input', 'test@test.com');
    assert.equal(this.element.querySelector('.error').textContent, '');
  });

  test('clicking save valid email results success message', async function(assert) {
    await visit('/');
    await fillIn('input', 'test@test.com');
    await click('button');
    assert.equal(this.element.querySelector('.success').textContent, SUCCESS_MESSAGE);
  });
});
