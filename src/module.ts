import { defineNuxtModule } from '@nuxt/kit'
import type { NuxtPage } from '@nuxt/schema'

export interface IgnoreFoldersOptions {
  /**
   * Array of folder names to ignore from routing.
   * If specified, this will replace the default ignored folders.
   * @default ['assets', 'componsne', 'composables', 'layouts', 'middleware', 'plugins', 'public', 'server', 'shared', 'utils']
   * @example ['components', 'utils', 'assets']
   */
  folders?: string[]
}

// Default folders to ignore
const DEFAULT_IGNORED_FOLDERS = [
  'assets',
  'components',
  'composables',
  'layouts',
  'middleware',
  'plugins',
  'public',
  'server',
  'shared',
  'utils',
]

export default defineNuxtModule<IgnoreFoldersOptions>({
  meta: {
    name: 'nuxt-ignore-folders',
    configKey: 'ignoreFolders',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  defaults: {
    folders: undefined,
  },
  setup(options, nuxt) {
    const foldersToIgnore = options.folders !== undefined
      ? options.folders
      : DEFAULT_IGNORED_FOLDERS

    nuxt.hook('pages:extend', (pages) => {
      pages.splice(0, pages.length, ...filterIgnoredPages(pages, foldersToIgnore))
    })
  },
})

function filterIgnoredPages(pages: NuxtPage[], foldersToIgnore: string[]): NuxtPage[] {
  return pages
    .filter((page) => {
      if (!page.file) return true

      if (foldersToIgnore.length > 0) {
        const patterns = foldersToIgnore.map(folder =>
          new RegExp(`(^|/)${folder}/`),
        )
        return !patterns.some(pattern => pattern.test(page.file!))
      }

      return true
    })
    .map(page =>
      page.children
        ? {
            ...page,
            children: filterIgnoredPages(page.children, foldersToIgnore),
          }
        : page,
    )
}
