import type { UserOptions, ResolvedOptions } from './types/options';
import { normalizePath } from 'vite';

/**
 * Resolves the user options by adding all the default options.
 * @param userOptions the options the user passed in
 * @param viteRoot the root of the vite project
 * @returns the resolved options
 */
export async function resolveOptions(userOptions: UserOptions, viteRoot?: string): Promise<ResolvedOptions> {
  const { pagesDir = 'src/pages', exclude = [], syncIndex = true, importMode = 'async' } = userOptions;

  const root = viteRoot || normalizePath(process.cwd());

  const extensions = userOptions.extensions || ['tsx', 'jsx', 'js', 'ts'];

  const extensionsRE = new RegExp(`\\.(${extensions.join('|')})$`);

  const resolvedOptions: ResolvedOptions = {
    pagesDir,
    root,
    importMode,
    extensions,
    exclude,
    syncIndex,
    extensionsRE,
  };

  return resolvedOptions;
}
