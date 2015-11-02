/* globals define, Ember, LGTM */

(function () {
  define('lgtm', [], function () {
    LGTM.configure('defer', Ember.RSVP.defer);
    return { 'default': LGTM };
  });
})();
