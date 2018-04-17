import LGTM from 'lgtm';
import require from 'require';
import { module, test } from 'qunit';

module('Unit | Vendor | lgtm shim', function() {
  test('can import lgtm', function(assert) {
    assert.equal(LGTM, window.LGTM);
  });

  test('can require lgtm', function(assert) {
    assert.ok(require('lgtm'));
    assert.ok(require('lgtm').default);
    assert.equal(require('lgtm').default, window.LGTM);
  });
});
