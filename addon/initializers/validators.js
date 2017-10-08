import Ember from 'ember';
import LGTM from 'lgtm';

// Need for LGTML to consider this invalid. We just care about the aggregate
const DEFAULT_ALL_ARE_VALID_ERROR_MESSAGE = 'Generic Error';
const DEFAULT_IS_VALID_ERROR_MESSAGE = 'Generic Error';

export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
  /**
   * Validates a validatable objects
   * A validatable object is anything with a `validate`
   * function returning a boolean promise (like the mixin mixin/validatable)
   */
  LGTM.helpers.register('isValid', function (message) {
      this.using(function (validatableObject) {
          if (!validatableObject) {
              return true; // if it's not set, we simply bypass. Add .required explicitly if needed
          }
          return validatableObject.validate();
      }, message || DEFAULT_IS_VALID_ERROR_MESSAGE);
  });
  /**
   * Validates all validatable objects in the array are valid
   * A validatable object is anything with a `validate`
   * function returning a boolean promise (like the mixin mixin/validatable)
   */
  LGTM.helpers.register('allAreValid', function (message) {
      this.using(function (array) {
          if (!array) {
              return true; // if it's not set, we simply bypass. Add .required explicitly if needed
          }

          var validations = array.map(function (property) {
                  return property.validate();
              });
          return Ember.RSVP.all(validations).then(function (results) {
              return results.every(function (result) {
                  return result;
              });
          });
      }, message || DEFAULT_ALL_ARE_VALID_ERROR_MESSAGE);
  });

}

export default {
  name: 'validators',
  initialize: initialize
};
