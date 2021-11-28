import type { PrepRoute } from '../types/route';

/**
 * Sort function for prioritizing routes.
 * / only should be prioritized
 * Then, it should prioritize /about /contact
 * Then it should prioritize /:slug /:something
 * Then just return 1 for every other edge case
 * @param {PrepRoute} a
 * @returns {Number}
 * @example
 * // Just put the function inside of an array sort function.
 * array.sort(sortRoute);
 */
export function sortRoute(a: PrepRoute): number {
  a.children?.sort(sortRoute);
  if (a.name === '/') return -1;
  if (/^\/[A-Za-z0-9]/.test(a.name)) return -1;
  if (/^\/:/.test(a.name)) return 1;
  return 1;
}
