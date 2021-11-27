import type { PreRoute } from './types/route';
import type { FileOutput } from './types/page';
import { isDynamicRoute, isMultiRoute } from './utils/validate';
import { stringifyRoutes } from './stringify';
import { haveChildren } from './crawler/crawler';
import { extname } from 'path';
import { sortRoute } from './utils/route';
import type { ResolvedOptions } from './types/options';

/**
 * Generate
 * @param pages
 * @returns
 */
export function generateRoutes(pages: FileOutput[]): PreRoute[] {
  const routes: PreRoute[] = [];

  for (let i = 0; i < pages.length; i++) {
    const node = pages[i].path.split('/')[pages[i].path.split('/').length - 1];
    const fileExt = extname(node);
    const isDynamic = isDynamicRoute(node.replace(fileExt, ''));
    const isMulti = isMultiRoute(node.replace(fileExt, ''));
    const normalizedName = isDynamic
      ? node
          .replace(fileExt, '')
          .replace(/^\[(?:\.{3})?/, '')
          .replace(/\]$/, '')
      : node.replace(fileExt, '');
    const normalizedPath = normalizedName.toLowerCase();
    let name: string;
    if (normalizedPath === 'index') {
      name = '/';
    } else {
      if (isMulti) {
        name = `/*${normalizedName}`;
      } else if (isDynamic) {
        name = `/:${normalizedName}`;
      } else {
        name = `/${normalizedPath}`;
      }
    }

    if (!haveChildren(pages[i])) {
      routes.push({
        name,
        path: pages[i].path,
      });
      continue;
    }

    routes.push({
      name,
      children: generateRoutes(pages[i].children as FileOutput[]),
    });
  }

  return routes;
}

/**
 * This pretty much acts as a final codegen for it to be executed by Vite.
 * @param {PreRoute[]} routes
 * @returns {String}
 */
export function generateClientCode(routes: PreRoute[], options: ResolvedOptions): string {
  const { importMode } = options;
  const { imp, out } = stringifyRoutes(routes.sort(sortRoute), importMode);
  let code = '';

  if (importMode === 'async') {
    code += 'import {lazy} from "solid-js";\n';
  } else {
    code += `${imp.join(';\n')}${imp.length > 1 ? ';' : ''}\n\n`;
  }

  code += `const routes = ${out};\n\n`;
  code += `export default routes;`;

  return code;
}
