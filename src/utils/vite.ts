import type { ViteDevServer, ModuleNode } from 'vite';
import Debug from 'debug';
import { MODULE_ID_VIRTUAL } from '../constants';

export const debug = {
  hmr: Debug('vite-plugin-pages-solid:hmr'),
  parser: Debug('vite-plugin-pages-solid:parser'),
  gen: Debug('vite-plugin-pages-solid:gen'),
  options: Debug('vite-plugin-pages-solid:options'),
  cache: Debug('vite-plugin-pages-solid:cache'),
  pages: Debug('vite-plugin-pages-solid:pages'),
};

export function getPagesVirtualModule(server: ViteDevServer): ModuleNode | null {
  const { moduleGraph } = server;
  const module = moduleGraph.getModuleById(MODULE_ID_VIRTUAL);
  if (module) {
    moduleGraph.invalidateModule(module);
    return module;
  }
  return null;
}
