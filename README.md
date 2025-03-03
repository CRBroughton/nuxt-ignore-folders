# Nuxt Ignore Folders

A simple Nuxt module that allows you to specify folders to ignore from the file-based routing system. By default, Nuxt's pages router includes all files in the `pages` directory, but sometimes you may want to keep other folders (like `components`, `utils`, etc.) in your pages directory without them becoming part of your routes.

## Installation

```bash
npm install @crbroughton/nuxt-ignore-folders
```

## Usage

Add the module to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: [
    '@crbroughton/nuxt-ignore-folders'
  ],
  
  // Module options
  ignoreFolders: {
    // Specify folders to ignore (replaces defaults)
    folders: ['composables']
  }
})
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `folders` | `string[]` | `['assets', 'components', 'composables', 'layouts', 'middleware', 'plugins', 'public', 'server', 'shared', 'utils']` | Array of folder names to ignore from file-based routing. If you specify this option, it will replace the default list. |

## How it works

This module hooks into Nuxt's `pages:extend` hook to filter out pages that match your ignored folder patterns. Any page with a file path containing `/<folder>/` will be excluded from routing.

For example, if you set `folders: ['components']`, the following paths would be excluded:

- `/components/Button.vue`
- `/admin/components/Sidebar.vue`
- `/any/path/with/components/inside.vue`

But these would still be included:
- `/component-demos/index.vue` (not in a 'components' folder)
- `/about/components-overview.vue` (not in a 'components' folder)

## License

MIT