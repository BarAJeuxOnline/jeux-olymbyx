<script setup lang="ts">
defineOptions({
  name: 'NavigationBar',
})

defineProps<{}>()

const { t } = useI18n()

const { x, y } = useWindowScroll()
const route = useRoute()

const solid = computed(() => {
  const solidNav = Number(route.meta.solidNav)

  if (solidNav === 0) {
    return true
  }

  return y.value > (solidNav || 600)
})
</script>

<template>
  <Header class="fixed!" text-white transition-colors transition-duration-500 transition-ease-in-out :class="{
  'bg-amber-300 shadow-lg': solid
  }">
    <template #home>
      <Transition name="fade">
        <div v-if="solid">
          <h3 mt-0 ml-4 text-white font-serif text-shadow-md>{{ t('hero.title') }}</h3>
        </div>
      </Transition>
    </template>

    <template #right>
      <NavigationMenu :solid="solid" />
    </template>
  </Header>
</template>

<i18n lang="yaml">
  fr:
    hero:
      title: "Jeux Olymbyx"
  en: 
    hero:
      title: "Olymbyx Games"
</i18n>