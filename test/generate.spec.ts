import { resolve } from 'path';
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { normalizePath } from 'vite';
import { generateRoutes, generateClientCode } from '../src/generate';
import { resolvePages } from '../src/pages';
import { resolveOptions } from '../src/options';
import { pathToName } from '../src/utils/convert';

const currentPath = normalizePath(resolve());
const currentPathNormalized = pathToName(currentPath);

test('Routes Sync', async () => {
  const options = await resolveOptions({
    pagesDir: 'test/assets/pages',
    importMode: 'sync',
  });
  const pages = await resolvePages(options);
  const routes = generateRoutes(pages);
  const code = generateClientCode(routes, options);

  const expectedRoutes = [
    {
      children: [
        {
          children: [
            {
              name: '/',
              path: `${currentPath}/test/assets/pages/blog/today/index.jsx`,
            },
          ],
          name: '/today',
        },
        {
          name: '/',
          path: `${currentPath}/test/assets/pages/blog/index.jsx`,
        },
        {
          name: '/:id',
          path: `${currentPath}/test/assets/pages/blog/[id].jsx`,
        },
      ],
      name: '/blog',
    },

    {
      name: '/components',
      path: `${currentPath}/test/assets/pages/components.tsx`,
    },
    {
      name: '/',
      path: `${currentPath}/test/assets/pages/index.tsx`,
    },
    {
      children: [
        {
          name: '/',
          path: `${currentPath}/test/assets/pages/about/index.js`,
        },
      ],
      name: '/about',
    },
    {
      name: '/:userId',
      path: `${currentPath}/test/assets/pages/[userId].tsx`,
    },
    {
      children: [
        {
          name: '/current',
          path: `${currentPath}/test/assets/pages/[sensor]/current.ts`,
        },
        {
          name: '/*all',
          path: `${currentPath}/test/assets/pages/[sensor]/[...all].ts`,
        },
      ],
      name: '/:sensor',
    },
    {
      name: '/*all',
      path: `${currentPath}/test/assets/pages/[...all].tsx`,
    },
    {
      children: [
        {
          name: '/',
          path: `${currentPath}/test/assets/pages/__test__/index.js`,
        },
      ],
      name: '/__test__',
    },
  ];

  expectedRoutes.forEach((i) =>
    assert.equal(
      routes.find((o) => o.name === i.name),
      i,
    ),
  );

  const expectedCode = `import ${currentPathNormalized}_test_assets_pages_blog_today_index_jsx from "${currentPath}/test/assets/pages/blog/today/index.jsx";
import ${currentPathNormalized}_test_assets_pages_blog_index_jsx from "${currentPath}/test/assets/pages/blog/index.jsx";
import ${currentPathNormalized}_test_assets_pages_blog_$id$_jsx from "${currentPath}/test/assets/pages/blog/[id].jsx";
import ${currentPathNormalized}_test_assets_pages_components_tsx from "${currentPath}/test/assets/pages/components.tsx";
import ${currentPathNormalized}_test_assets_pages_index_tsx from "${currentPath}/test/assets/pages/index.tsx";
import ${currentPathNormalized}_test_assets_pages_about_index_js from "${currentPath}/test/assets/pages/about/index.js";
import ${currentPathNormalized}_test_assets_pages_$___all$_tsx from "${currentPath}/test/assets/pages/[...all].tsx";
import ${currentPathNormalized}_test_assets_pages_$sensor$_current_ts from "${currentPath}/test/assets/pages/[sensor]/current.ts";
import ${currentPathNormalized}_test_assets_pages_$sensor$_$___all$_ts from "${currentPath}/test/assets/pages/[sensor]/[...all].ts";
import ${currentPathNormalized}_test_assets_pages_$userId$_tsx from "${currentPath}/test/assets/pages/[userId].tsx";
import ${currentPathNormalized}_test_assets_pages___test___index_js from "${currentPath}/test/assets/pages/__test__/index.js";

const routes = [{ path: "/blog", children: [{ path: "/today", children: [{ path: "/", component: ${currentPathNormalized}_test_assets_pages_blog_today_index_jsx},
]},
{ path: "/", component: ${currentPathNormalized}_test_assets_pages_blog_index_jsx},
{ path: "/:id", component: ${currentPathNormalized}_test_assets_pages_blog_$id$_jsx},
]},
{ path: "/components", component: ${currentPathNormalized}_test_assets_pages_components_tsx},
{ path: "/", component: ${currentPathNormalized}_test_assets_pages_index_tsx},
{ path: "/about", children: [{ path: "/", component: ${currentPathNormalized}_test_assets_pages_about_index_js},
]},
{ path: "/*all", component: ${currentPathNormalized}_test_assets_pages_$___all$_tsx},
{ path: "/:sensor", children: [{ path: "/current", component: ${currentPathNormalized}_test_assets_pages_$sensor$_current_ts},
{ path: "/*all", component: ${currentPathNormalized}_test_assets_pages_$sensor$_$___all$_ts},
]},
{ path: "/:userId", component: ${currentPathNormalized}_test_assets_pages_$userId$_tsx},
{ path: "/__test__", children: [{ path: "/", component: ${currentPathNormalized}_test_assets_pages___test___index_js},
]},
];

export default routes;`;

  assert.fixture(code, expectedCode);
});

test('Route async', async () => {
  const options = await resolveOptions({
    pagesDir: 'test/assets/pages',
    importMode: 'async',
  });
  const pages = await resolvePages(options);
  const routes = generateRoutes(pages);
  const code = generateClientCode(routes, options);

  const expectedRoutes = [
    {
      name: '/blog',
      children: [
        {
          name: '/today',
          children: [
            {
              name: '/',
              path: `${currentPath}/test/assets/pages/blog/today/index.jsx`,
            },
          ],
        },
        {
          name: '/',
          path: `${currentPath}/test/assets/pages/blog/index.jsx`,
        },
        {
          name: '/:id',
          path: `${currentPath}/test/assets/pages/blog/[id].jsx`,
        },
      ],
    },
    {
      name: '/components',
      path: `${currentPath}/test/assets/pages/components.tsx`,
    },
    {
      name: '/',
      path: `${currentPath}/test/assets/pages/index.tsx`,
    },
    {
      name: '/about',
      children: [
        {
          name: '/',
          path: `${currentPath}/test/assets/pages/about/index.js`,
        },
      ],
    },
    {
      name: '/:userId',
      path: `${currentPath}/test/assets/pages/[userId].tsx`,
    },
    {
      children: [
        {
          name: '/current',
          path: `${currentPath}/test/assets/pages/[sensor]/current.ts`,
        },
        {
          name: '/*all',
          path: `${currentPath}/test/assets/pages/[sensor]/[...all].ts`,
        },
      ],
      name: '/:sensor',
    },
    {
      name: '/*all',
      path: `${currentPath}/test/assets/pages/[...all].tsx`,
    },
    {
      name: '/__test__',
      children: [
        {
          name: '/',
          path: `${currentPath}/test/assets/pages/__test__/index.js`,
        },
      ],
    },
  ];

  expectedRoutes.forEach((i) =>
    assert.equal(
      routes.find((o) => o.name === i.name),
      i,
    ),
  );

  const expectedCode = `import {lazy} from "solid-js";
const routes = [{ path: "/blog", children: [{ path: "/today", children: [{ path: "/", component: lazy(() => import("${currentPath}/test/assets/pages/blog/today/index.jsx"))},
]},
{ path: "/", component: lazy(() => import("${currentPath}/test/assets/pages/blog/index.jsx"))},
{ path: "/:id", component: lazy(() => import("${currentPath}/test/assets/pages/blog/[id].jsx"))},
]},
{ path: "/components", component: lazy(() => import("${currentPath}/test/assets/pages/components.tsx"))},
{ path: "/", component: lazy(() => import("${currentPath}/test/assets/pages/index.tsx"))},
{ path: "/about", children: [{ path: "/", component: lazy(() => import("${currentPath}/test/assets/pages/about/index.js"))},
]},
{ path: "/*all", component: lazy(() => import("${currentPath}/test/assets/pages/[...all].tsx"))},
{ path: "/:sensor", children: [{ path: "/current", component: lazy(() => import("${currentPath}/test/assets/pages/[sensor]/current.ts"))},
{ path: "/*all", component: lazy(() => import("${currentPath}/test/assets/pages/[sensor]/[...all].ts"))},
]},
{ path: "/:userId", component: lazy(() => import("${currentPath}/test/assets/pages/[userId].tsx"))},
{ path: "/__test__", children: [{ path: "/", component: lazy(() => import("${currentPath}/test/assets/pages/__test__/index.js"))},
]},
];

export default routes;`;

  assert.fixture(code, expectedCode);
});

test.run();
