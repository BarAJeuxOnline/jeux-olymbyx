export const useMenu = () => {
  const { t } = useI18n()

  const menu = ref([
    {
      to: { name: 'Home' },
      label: t('navigation.home')
    },
  ])

  return { menu }
}