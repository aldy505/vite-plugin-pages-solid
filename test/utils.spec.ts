import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { slash, pathToName, toArray } from '../src/utils/convert';
import { isDynamicRoute, isCatchAllRoute } from '../src/utils/validate';

test('Normalize path', () => {
  assert.equal(slash('C:\\project\\from\\someone'), 'C:/project/from/someone');
});

test('Dynamic route', () => {
  assert.equal(isDynamicRoute('[id]'), true);
  assert.equal(isDynamicRoute('me'), false);
});

test('Catch all route', () => {
  assert.equal(isCatchAllRoute('[...all]'), true);
  assert.equal(isCatchAllRoute('[id]'), false);
});

test('Path to name', () => {
  assert.equal(pathToName('user-[route]-current'), 'user_$route$_current');
});

test('toArray', () => {
  assert.equal(toArray('foo'), ['foo']);
  assert.equal(toArray(['foo', 'bar']), ['foo', 'bar']);
});

test.run();
