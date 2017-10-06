/* globals define, Ember, LGTM */

(function () {
  define('lgtm', [], function () {
    LGTM.configure('Promise', Ember.RSVP.Promise);
    LGTM.configure('get', Ember.get);
    return { 'default': LGTM };
  });
})();
