module.exports = {
  normalizeEntityName: function() {},
  description: 'Default blueprint for ember-lgtm, installs LGTM in bower.json',
  afterInstall: function () {
    return this.addBowerPackageToProject('lgtm');
  }
};
