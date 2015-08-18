/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-lgtm',
  included: function (app) {
    app.import(app.bowerDirectory + '/lgtm/dist/lgtm-standalone.js');
    app.import('vendor/lgtm-shim.js');
  }
};
