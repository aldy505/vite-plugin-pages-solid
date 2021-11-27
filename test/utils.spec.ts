import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { pathToName, toArray } from '../src/utils/convert';
import { isDynamicRoute, isMultiRoute } from '../src/utils/validate';

test('Dynamic routes', () => {
  assert.equal(isDynamicRoute('[id]'), true);
  assert.equal(isDynamicRoute('me'), false);
});

test('Multi routes', () => {
  assert.equal(isMultiRoute('[...all]'), true);
  assert.equal(isMultiRoute('[id]'), false);
});

test('Path to name', () => {
  assert.equal(pathToName('user-[route]-current'), 'user_$route$_current');
});

test('toArray', () => {
  assert.equal(toArray('foo'), ['foo']);
  assert.equal(toArray(['foo', 'bar']), ['foo', 'bar']);
});

test.run();
