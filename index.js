/* eslint-env node */
var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-lgtm',
  included: function (app) {
    app.import('vendor/lgtm.js');
    app.import('vendor/shims/lgtm.js');
  },
  treeForVendor: function (vendorTree) {
    var lgtmTree = new Funnel(new Funnel(path.dirname(require.resolve('lgtm/dist/lgtm.js'))), {
      files: ['lgtm.js'],
    });
    return new MergeTrees([vendorTree, lgtmTree]);
  }
};
