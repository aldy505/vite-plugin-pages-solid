import type { PrepRoute } from '../types/route';

/**
 * @important ⚠️ NEVER EVER CHANGE THIS FUNCTION. YOU WILL HAVE TO CHANGE ALL THE TESTS! ⚠️
 * @param route The route to Rate
 * @returns The value of the route
 */
export function routeValue(route: PrepRoute): number {
  if (route.name === '/') return -1;
  if (/^\/[A-Za-z0-9\-_]/.test(route.name)) return 0;
  // 1 is the value of an unknown type of route.
  if (/^\/:.*\?$/.test(route.name)) return 2;
  if (/^\/:/.test(route.name)) return 3;
  if (/^\/\*.*\?$/.test(route.name)) return 4;
  if (/^\/\*/.test(route.name)) return 5;
  return 1;
}

/**
 * Sort function for prioritizing routes.\
 * First, `/` only should be prioritized (value -1).\
 * Then, it should prioritize `/about`, `/contact` (value 0).\
 * Then, it should prioritize `/:slug`, `/:something` (value 3).\
 * Then, it should prioritize `/*`, `/*all` (value 5).\
 * Note that optional parameter are prioritized before required parameters.\
 * Then, just return 1 for every other edge case
 * @returns {Number}
 * @example
 * // Just put the function inside of an array sort function.
 * array.sort(routeSorter);
 */
export function routeSorter(a: PrepRoute, b: PrepRoute): number {
  return routeValue(a) - routeValue(b) || a.name.localeCompare(b.name, 'en');
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
    // deepcode ignore MissingArgument: It ain't missing
    if (route.children) {
      sortRoutes(route.children);
    }
  });
  return r;
}
