import type { ResolvedOptions } from '../src/types/options';
import type { FileOutput } from '../src/types/page';
import { resolve } from 'path';
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { addPage, removePage, resolvePages } from '../src/pages';

const currentPath = resolve();

test('resolvePages', async () => {
  const options: ResolvedOptions = {
    pagesDir: 'test/assets/pages',
    extensions: ['jsx', 'tsx', 'ts', 'js'],
    exclude: ['.git', 'node_modules'],
    importMode: 'async',
    root: process.cwd(),
    extensionsRE: /\.(jsx|tsx|ts|js)/,
    syncIndex: true,
  };

  const result = await resolvePages(options);
  const expectedResult = [
    {
      path: `${currentPath}/test/assets/pages/index.tsx`,
    },
    {
      path: `${currentPath}/test/assets/pages/components.tsx`,
    },
    {
      children: [
        {
          path: `${currentPath}/test/assets/pages/blog/index.jsx`,
        },
        {
          path: `${currentPath}/test/assets/pages/blog/[id].jsx`,
        },
        {
          children: [
            {
              path: `${currentPath}/test/assets/pages/blog/today/index.jsx`,
            },
          ],
          path: `${currentPath}/test/assets/pages/blog/today`,
        },
      ],
      path: `${currentPath}/test/assets/pages/blog`,
    },
    {
      children: [
        {
          path: `${currentPath}/test/assets/pages/about/index.js`,
        },
      ],
      path: `${currentPath}/test/assets/pages/about`,
    },
    {
      children: [
        {
          path: `${currentPath}/test/assets/pages/__test__/index.js`,
        },
      ],
      path: `${currentPath}/test/assets/pages/__test__`,
    },
    {
      path: `${currentPath}/test/assets/pages/[userId].tsx`,
    },
    {
      children: [
        {
          path: `${currentPath}/test/assets/pages/[sensor]/current.ts`,
        },
        {
          path: `${currentPath}/test/assets/pages/[sensor]/[...all].ts`,
        },
      ],
      path: `${currentPath}/test/assets/pages/[sensor]`,
    },
    {
      path: `${currentPath}/test/assets/pages/[...all].tsx`,
    },
  ];

  expectedResult.forEach((i) =>
    assert.equal(
      result.find((o) => o.path === i.path),
      i,
    ),
  );
});

test('addPage', () => {
  const pages: FileOutput[] = [{ path: '/foo' }, { path: '/bar' }];
  addPage(pages, { path: '/baz' });
  assert.equal(pages, [{ path: '/foo' }, { path: '/bar' }, { path: '/baz' }]);
});

test('removePage', () => {
  const pages: FileOutput[] = [{ path: '/foo' }, { path: '/bar' }];
  removePage(pages, { path: '/foo' });
  assert.equal(pages, [{ path: '/bar' }]);
});

test.run();
