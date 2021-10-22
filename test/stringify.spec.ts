import type { PreRoute } from '../src/types/route';
import { stringifyRoutes } from '../src/stringify';
import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('Should stringify', () => {
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
  const result = stringifyRoutes(route);

  assert.equal(result.imp, [
    'import _home_foo_bar_index_tsx from "/home/foo/bar/index.tsx"',
    'import _home_foo_bar_about_index_tsx from "/home/foo/bar/about/index.tsx"',
    'import _home_foo_bar_about_contact_tsx from "/home/foo/bar/about/contact.tsx"',
  ]);
  assert.equal(
    result.out,
    '[{ path: "index", component: _home_foo_bar_index_tsx},\n' +
      '{ path: "about", children: [{ path: "index", component: _home_foo_bar_about_index_tsx},\n' +
      ',{ path: "contact", component: _home_foo_bar_about_contact_tsx},\n' +
      ']},\n' +
      ']',
  );
});

test.run();
