/* eslint-env node */
var path = require('path');
var UnwatchedDir = require('broccoli-source').UnwatchedDir;
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
    var lgtmNode = new UnwatchedDir(lgtmPath);

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(
      funnel(lgtmNode, {
        destDir: 'lgtm'
      })
    );

    return mergeTrees(trees);
  }
};
