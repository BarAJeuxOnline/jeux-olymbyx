export const useMenu = () => {
  // const { t } = useI18n()

  const menu = ref([
    {
      to: { name: 'Home' },
      label: 'Accueil',
      icon: 'i-mdi-home'
    },
    {
      to: { name: 'CGU' },
      label: 'Règlement et Conditions',
      icon: 'i-mdi-pencil-ruler'
    },
  ])

  return { menu }
}