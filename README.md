# vite-plugin-pages

[![npm](https://img.shields.io/npm/v/vite-plugin-pages-solid?style=flat-square) ![npm bundle size](https://img.shields.io/bundlephobia/min/vite-plugin-pages-solid?style=flat-square) ![npm](https://img.shields.io/npm/dm/vite-plugin-pages-solid?style=flat-square)](https://www.npmjs.com/package/vite-plugin-pages-solid) [![Codecov](https://img.shields.io/codecov/c/github/aldy505/vite-plugin-pages-solid?style=flat-square)](https://codecov.io/gh/aldy505/vite-plugin-pages-solid) [![GitHub branch checks state](https://img.shields.io/github/checks-status/aldy505/vite-plugin-pages-solid/master?style=flat-square)](https://github.com/aldy505/vite-plugin-pages-solid/actions) [![CodeFactor](https://www.codefactor.io/repository/github/aldy505/vite-plugin-pages-solid/badge)](https://www.codefactor.io/repository/github/aldy505/vite-plugin-pages-solid) [![GitHub](https://img.shields.io/github/license/aldy505/vite-plugin-pages-solid?style=flat-square)](https://github.com/aldy505/vite-plugin-pages-solid/blob/master/LICENSE)

> File system based routing for Solid applications using
> [Vite](https://github.com/vitejs/vite)

This is a kind of fork of [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages) for Vue, but if I was about to add a Solid implementation to it, I will break a lot of things. Hence, it should be a good thing to create a new repository for it.

**⚠ Expect a lot of breaking changes, until at least 0.5.x**

## Getting Started

### Solid

Install:

```bash
$ npm install -D vite-plugin-pages-solid
$ npm install solid-app-router
```

Add to your `vite.config.js`:

```js
import { defineConfig } from 'vite';
import { solid } from '@solidjs/vite-plugin-solid';
import pages from 'vite-plugin-pages-solid';

export default defineConfig({
  plugins: [solid(), pages()],
});
```

## Overview

By default a page is a solid component exported from a `.solid` file in the
`src/pages` directory.

You can access the generated routes by importing the `virtual:generated-pages-solid`
module in your application.

### solid

```html
<script>
  import { Router } from 'solid-router-spa';
  import routes from 'virtual:generated-pages-solid';
</script>

<Router {routes} />
```

**Type**

```ts
// vite-env.d.ts
/// <reference types="vite-plugin-pages-solid/client" />
```

## File System Routing

Inspired by the routing from
[NuxtJS](https://nuxtjs.org/guides/features/file-system-routing) 💚

- [Basic Routing](#basic-routing)
- [Index Routes](#index-routes)
- [Dynamic Routes](#dynamic-routes)
- [Nested Routes](#nested-routes)
- [Catch-all Routes](#catch-all-routes)

### Basic Routing

Pages will automatically map files from your pages directory to a route with the
same name:

- `src/pages/users.solid` -> `/users`
- `src/pages/users/profile.solid` -> `/users/profile`
- `src/pages/settings.solid` -> `/settings`

### Index Routes

Files with the name `index` are treated as the index page of a route:

- `src/pages/index.solid` -> `/`
- `src/pages/users/index.solid` -> `/users`

### Dynamic Routes

Dynamic routes are denoted using square brackets. Both directories and pages can
be dynamic:

- `src/pages/users/[id].solid` -> `/users/:id` (`/users/one`)
- `src/pages/[user]/settings.solid` -> `/:user/settings` (`/one/settings`)

Any dynamic parameters will be passed to the page as props. For example, given
the file `src/pages/users/[id].solid`, the route `/users/abc` will be passed the
following props:

```json
{ "id": "abc" }
```

### Nested Routes

We can make use of solid Routers child routes to create nested layouts. The parent
component can be defined by giving it the same name as the directory that
contains your child routes.

For example, this directory structure:

```
src/pages/
  ├── users/
  │  ├── [id].solid
  │  └── index.solid
  └── users.solid
```

### Catch-all Routes

Catch-all routes are denoted with square brackets containing an ellipsis:

- `src/pages/[...all].solid` -> `/*` (`/non-existent-page`)

The text after the ellipsis will be used both to name the route, and as the name
of the prop in which the route parameters are passed.

## Configuration

To use custom configuration, pass your options to Pages when instantiating the
plugin:

```js
// vite.config.js
import pages from 'vite-plugin-pages-solid';

export default {
  plugins: [
    pages({
      // Defaults to src/pages
      pagesDir: 'src/views',
    }),
  ],
};
```

### pagesDir

- **Type:** `string`
- **Default:** `'src/pages'`

Relative path to the pages directory. DOES NOT supports globs.

Can be:

- single path: routes point to `/`

### extensions

- **Type:** `string[]`
- **Default:**
  - `['js', 'jsx', 'ts', 'tsx']`

An array of valid file extensions for pages.

### exclude

- **Type:** `string[]`
- **Default:** `[]`

An array of string (not globs) patterns to exclude matches.

```bash
# folder structure
src/pages/
  ├── users/
  │  ├── components
  │  │  └── form.js
  │  ├── [id].jsx
  │  └── index.jsx
  └── home.jsx
```

```js
// vite.config.js
export default {
  plugins: [
    Pages({
      exclude: ['.js'],
    }),
  ],
};
```

### importMode

- **Type:** `"sync" | "async"`
- **Default:** `"async"`

Lets you choose whether to import everything dynamically or not.

## License

[MIT](./LICENSE)
