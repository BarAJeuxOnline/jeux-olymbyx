export default defineI18nConfig(() => ({
  legacy: false,
  locales: [
    {
      code: 'fr',
      iso: 'fr-FR',
      file: 'fr.yaml'
    },
    {
      code: 'en',
      iso: 'en-US',
      file: 'en.yaml'
    }
  ],
  defaultLocale: 'fr',
  locale: 'fr',
  baseUrl: 'https://jeux-olymbyx.barajeuxonline.fr',
  defaultSFCLang: 'yaml',
}))
