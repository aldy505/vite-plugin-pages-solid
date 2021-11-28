import type { PrepRoute } from '../types/route';

export function routeValue(route: PrepRoute): number {
  if (route.name === '/') return -1;
  if (/^\/[A-Za-z0-9]/.test(route.name)) return 0;
  if (/^\/:/.test(route.name)) return 1;
  if (/^\/\*/.test(route.name)) return 2;
  return 3;
}

/**
 * Sort function for prioritizing routes.\
 * First `/` only should be prioritized\
 * Then, it should prioritize `/about` `/contact`\
 * Then, it should prioritize `/:slug` `/:something`\
 * Then, it should prioritize `/*` `/*all`\
 * Then, just return 3 for every other edge case
 * @returns {Number}
 * @example
 * // Just put the function inside of an array sort function.
 * array.sort(routeSorter);
 */
export function routeSorter(a: PrepRoute, b: PrepRoute): number {
  return routeValue(a) - routeValue(b);
}

/**
 * Sort function for prioritizing routes.
 * @example sortRoute(routes);
 */
export function sortRoute(r: PrepRoute): PrepRoute {
  r.children?.sort(routeSorter).forEach((route) => {
    if (route.children) {
      sortRoutes(route.children);
    }
  });
  return r;
}

/**
 * Sort function for prioritizing routes.
 * @example sortRoute(routes);
 */
export function sortRoutes(r: PrepRoute[]): PrepRoute[] {
  r.sort(routeSorter).forEach((route) => {
    if (route.children) {
      sortRoutes(route.children);
    }
  });
  return r;
}
