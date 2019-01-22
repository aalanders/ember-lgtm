/* eslint-env node */
var path = require('path');
var funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-lgtm',
  included: function (app) {
    this._super.included.apply(this, arguments);

    app.import('vendor/lgtm/lgtm.js', { prepend: true });
    app.import('vendor/shims/lgtm.js');
  },
  treeForVendor(vendorTree) {
    var trees = [];
    var lgtmPath = path.dirname(require.resolve('lgtm'));

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(
      funnel(lgtmPath, {
        destDir: 'lgtm'
      })
    );

    return mergeTrees(trees);
  }
};
