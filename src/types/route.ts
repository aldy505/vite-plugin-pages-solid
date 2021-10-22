import { RouteDefinition } from 'solid-app-router';

export type Route = RouteDefinition;

export interface PreRoute {
  name: string;
  path?: string;
  children?: PreRoute[];
}
