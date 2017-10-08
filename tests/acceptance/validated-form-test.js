import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | validated form sample');

const REQUIRED_ERROR_MESSAGE = 'Email address is required';
const INVALID_ERROR_MESSAGE = 'Enter a valid email';
const SUCCESS_MESSAGE = 'Form saved';

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('clicking save before field is populated results in a validation error', function(assert) {
  visit('/');
  click('button');
  andThen(function() {
    assert.equal(findWithAssert('.error').text(), REQUIRED_ERROR_MESSAGE);
  });
});

test('clicking save with invalid email results in a validation error', function(assert) {
  visit('/');
  fillIn('input', 'abc');
  click('button');
  andThen(function() {
    assert.equal(findWithAssert('.error').text(), INVALID_ERROR_MESSAGE);
  });
});

test('clicking save valid email results success message', function(assert) {
  visit('/');
  fillIn('input', 'test@test.com');
  click('button');
  andThen(function() {
    assert.equal(findWithAssert('.success').text(), SUCCESS_MESSAGE);
  });
});
