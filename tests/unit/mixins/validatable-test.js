import Ember from 'ember';
import ValidatableMixin from '../../../mixins/validatable';
import { module, test } from 'qunit';

module('Unit | Mixin | validatable');

// Replace this with your real tests.
test('it works', function(assert) {
  var ValidatableObject = Ember.Object.extend(ValidatableMixin);
  var subject = ValidatableObject.create();
  assert.ok(subject);
});
