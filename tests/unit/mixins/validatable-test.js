import Ember from 'ember';
import LGTM from 'lgtm';
import sinon from 'sinon';
import ValidatableMixin from 'ember-lgtm/mixins/validatable';
import QUnit from 'qunit';
import { module, test } from 'qunit';

module('Unit | Mixin | validatable');

function createValidator (validator) {
  let ValidatableObject = Ember.Object.extend(ValidatableMixin);
  return ValidatableObject.create({
    validator: validator || LGTM.validator()
      .validates('requiredProperty')
      .required('requiredProperty is required')
      .validates('requiredProperty2')
      .required('requiredProperty2 is required')
      .build()
  });
}


module('Unit | Mixin | validatable - creation tests');


test('Creation - A validator property needs to be defined with a build validator', function (assert) {
  let ValidatableObject = Ember.Object.extend(ValidatableMixin);
  let subject = ValidatableObject.create({
      validator: LGTM.validator()
        .validates('requiredProperty')
        .required('You must select a state to register for electronic transmission')
        .build()
    });
  assert.ok(subject);
});

test('Creation - throws on creation if no validator is defined', function (assert) {
  let ValidatableObject = Ember.Object.extend(ValidatableMixin);
  assert.throws(()=>ValidatableObject.create(),
    'throws on create if a validator isn\'t defined');
});

test('Validate - Validates based on the rules defined in the validator and sets the error (if any) into an `errors` hash', function (assert) {
  assert.expect(3);
  let subject = createValidator();
  QUnit.stop(); // Note: we manually handles async, since LGTM's promise aren't well configured yet. Need to get `LGTM.configure('defer', Ember.RSVP.defer);` to work
  subject.validate().then(function (isValid) {
    QUnit.start();
    assert.equal(isValid, false);
    assert.equal(subject.get('errors.requiredProperty'), 'requiredProperty is required');
    assert.equal(subject.get('errors.requiredProperty2'), 'requiredProperty2 is required');
  });
});

test('Validate - validates the specified property', function (assert) {
  assert.expect(1);
  let subject = createValidator();
  QUnit.stop();
  subject.validate('requiredProperty').then(()=> {
    QUnit.start();
    assert.equal(subject.get('errors.requiredProperty'), 'requiredProperty is required');
  });
});

test('Validate - validating a specific property, doesn\'t clear previous errros', function (assert) {
  assert.expect(2);
  let subject = createValidator();
  QUnit.stop();
  subject.validate().then(()=> subject.validate('requiredProperty').then(function () {
    QUnit.start();
    assert.equal(subject.get('errors.requiredProperty'), 'requiredProperty is required');
    assert.equal(subject.get('errors.requiredProperty2'), 'requiredProperty2 is required'); // From the first (global validation)
  }));
});

test('Validate - changing a property with errors, triggers a re-validation of that property', function (assert) {
  assert.expect(5);
  let subject = createValidator();
  sinon.spy(subject, 'validate');
  QUnit.stop();
  subject.validate('requiredProperty').then(()=> {
    QUnit.start();
    assert.equal(subject.get('errors.requiredProperty'), 'requiredProperty is required');
    assert.ok(subject.validate.calledOnce);
    subject.set('requiredProperty', 'newValue');
    assert.ok(subject.validate.calledTwice);
    assert.ok(subject.validate.alwaysCalledWith('requiredProperty'));
    assert.equal(subject.get('errors.requiredProperty'), undefined);
  });
});
