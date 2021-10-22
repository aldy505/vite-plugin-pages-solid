import type { PreRoute } from '../src/types/route';
import { stringifyRoutes } from '../src/stringify';
import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('Sync', () => {
  const route: PreRoute[] = [
    { name: 'index', path: '/home/foo/bar/index.tsx' },
    {
      name: 'about',
      path: '/home/foo/bar/about',
      children: [
        { name: 'index', path: '/home/foo/bar/about/index.tsx' },
        { name: 'contact', path: '/home/foo/bar/about/contact.tsx' },
      ],
    },
  ];
  const result = stringifyRoutes(route, 'sync');

  assert.equal(result.imp, [
    'import _home_foo_bar_index_tsx from "/home/foo/bar/index.tsx"',
    'import _home_foo_bar_about_index_tsx from "/home/foo/bar/about/index.tsx"',
    'import _home_foo_bar_about_contact_tsx from "/home/foo/bar/about/contact.tsx"',
  ]);

  assert.equal(
    result.out,
    `[{ path: "index", component: _home_foo_bar_index_tsx},
{ path: "about", children: [{ path: "index", component: _home_foo_bar_about_index_tsx},
{ path: "contact", component: _home_foo_bar_about_contact_tsx},
]},
]`,
  );
});

test('Async', () => {
  const route: PreRoute[] = [
    { name: 'index', path: '/home/foo/bar/index.tsx' },
    {
      name: 'about',
      path: '/home/foo/bar/about',
      children: [
        { name: 'index', path: '/home/foo/bar/about/index.tsx' },
        { name: 'contact', path: '/home/foo/bar/about/contact.tsx' },
      ],
    },
  ];
  const result = stringifyRoutes(route, 'async');

  assert.equal(result.imp, []);

  assert.equal(
    result.out,
    `[{ path: "index", component: lazy(() => import("/home/foo/bar/index.tsx"))},
{ path: "about", children: [{ path: "index", component: lazy(() => import("/home/foo/bar/about/index.tsx"))},
{ path: "contact", component: lazy(() => import("/home/foo/bar/about/contact.tsx"))},
]},
]`,
  );
});

test.run();
