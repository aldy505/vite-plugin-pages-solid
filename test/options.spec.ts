import { resolve } from 'path';
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { normalizePath } from 'vite';
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
    root: normalizePath(resolve()),
    syncIndex: true,
    importMode: 'async',
  });
});

test.run();
