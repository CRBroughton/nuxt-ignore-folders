export default defineNuxtConfig({
  extends: [
    'app/layers/testlayer',
  ],
  modules: ['../src/module'],
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2025-03-03',

  ignoreFolders: {
    folders: ['composables', 'components'],
  },

})
