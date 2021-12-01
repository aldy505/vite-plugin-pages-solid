import { RouteDefinition } from 'solid-app-router';

export type Route = RouteDefinition;

export interface PrepRoute {
  name: string;
  path?: string;
  children?: PrepRoute[];
}
