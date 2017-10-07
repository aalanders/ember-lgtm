/* eslint-env node */
module.exports = {
  normalizeEntityName: function() {},
  description: 'Default blueprint for ember-lgtm, installs LGTM in package.json',
  afterInstall: function () {
    return this.addPackageToProject('lgtm');
  }
};
