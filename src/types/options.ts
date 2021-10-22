/**
 * Plugin options.
 */
interface Options {
  /**
   * Relative path to the directory to search for page components.
   * @default 'src/pages'
   */
  pagesDir: string;
  /**
   * Valid file extensions for page components.
   * @default ['js','jsx','ts','tsx']
   */
  extensions: string[];
  /**
   * List of path globs to exclude when resolving pages.
   */
  exclude: string[];
  /**
   * Import mode, whether it be async or sync
   */
  importMode: 'sync' | 'async';
  /**
   * Sync load top level index file
   * @default true
   */
  syncIndex: boolean;
}

export type UserOptions = Partial<Options>;

export interface ResolvedOptions extends Options {
  /**
   * Resolves to the `root` value from Vite config.
   * @default config.root
   */
  root: string;
  /**
   * RegExp to match extensions
   */
  extensionsRE: RegExp;
}

export type ImportMode = 'sync' | 'async';
export type ImportModeResolveFn = (filepath: string) => ImportMode;
