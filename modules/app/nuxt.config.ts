
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      env: '',
    },
  },

  devServer: {
    port: 3000,
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },

  extends: ['@bajo-olymbyx/shared'],

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/content',
  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
})
