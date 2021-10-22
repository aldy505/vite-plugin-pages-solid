import { resolve } from 'path';
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { resolveOptions } from '../src/options';

test('resolve', async () => {
  const options = await resolveOptions({
    pagesDir: 'test/assets/pages',
  });
  assert.equal(options, {
    exclude: [],
    extensions: ['tsx', 'jsx', 'js', 'ts'],
    extensionsRE: /\.(tsx|jsx|js|ts)$/,
    pagesDir: 'test/assets/pages',
    root: resolve(),
    syncIndex: true,
    importMode: 'async',
  });
});

test.run();
