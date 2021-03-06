import type { ResolvedOptions } from '../types/options';
import { resolve, extname } from 'path';
import { normalizePath } from 'vite';

/**
 * Check if a given path is indeed a directory of pages or not
 * @param {String} path
 * @param {ResolvedOptions} options
 * @returns {Boolean}
 */
function isPagesDir(path: string, options: ResolvedOptions): boolean {
  for (const page of options.pagesDir) {
    const dirPath = normalizePath(resolve(options.root, page));
    if (path.startsWith(dirPath)) return true;
  }
  return false;
}

/**
 * To be honest I don't really know what this function does.
 * At least for now.
 * @param {String} path
 * @param {ResolvedOptions} options
 * @returns {Boolean}
 */
export function isTarget(path: string, options: ResolvedOptions): boolean {
  return isPagesDir(path, options) && options.extensionsRE.test(path);
}

/**
 * Check whether or not a routePath is a dynamic route.
 * @param {String} routePath
 * @returns {Boolean}
 */
export function isDynamicRoute(routePath: string): boolean {
  return /^\[(.+)\]$/.test(routePath);
}

/**
 * Check whether or not a routePath is a Multi route.
 * @param {String} routePath
 * @returns {Boolean}
 */
export function isMultiRoute(routePath: string): boolean {
  return /^\[\.{3}(.*)\]$/.test(routePath);
}

/**
 * Check whether or not a path contains some extensions
 * @param {String} path
 * @param {String[]} extensions
 * @returns {Boolean}
 */
export function containsExtension(path: string, extensions: string[]): boolean {
  const ext = extname(path).slice(1);
  return extensions.includes(ext);
}
