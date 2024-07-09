<script setup lang="ts">
defineOptions({
  name: 'AppHeader',
})

const container = ref(null)
const { tilt, roll } = useParallax(container)

const { t } = useI18n()
</script>

<template>
  <div ref="container" bg-bottom-left bg-cover ease-out transition-all duration-300 pt-16 :style="{
      backgroundImage: 'url(/assets/bombyx_greek_columns.webp)',
      // backgroundSize: 'auto 120%',
      backgroundPosition: `${50 + tilt * 10}% ${50 - roll * 10}%`,
    }">

    <div md:aspect-video md:max-h-4xl mx-auto>
      <div v-motion-slide-top slab-32 text-center>
        <h1 text-white font-serif lg:text-8xl text-5xl text-shadow-xl><span bg="blue-700/33" px-4>{{ t('hero.title') }}</span></h1>
        <h1 text-white font-serif text-shadow-xl><span bg="blue-700/33" px-4>{{ t('hero.subtitle') }}</span></h1>
      </div>

      <h4 text-white text-shadow-lg v-motion-slide-left text-center>{{ t('hero.present_by') }}</h4>

      <div v-motion-slide-left centered text-white>
        <a href="https://studiobombyx.com" target="_blank" btn-animation hover:scale-98>
          <img flex-1 src="/assets/logo_bombyx.svg" max-w-80 w-full />
        </a>
        <h4 text-shadow-lg>{{ t('hero.and') }}</h4>
        <a href="https://discord.gg/barajeuxonline" target="_blank" btn-animation hover:scale-98>
          <Logo flex-1 max-w-100 w-full />
        </a>
      </div>
    </div>
  </div>
</template>

<i18n lang="yaml">
  fr:
    hero:
      title: "Les Jeux Olymbyx"
      subtitle: "du 26 juillet au 11 août 2024"
      and: "et"
      present_by: "présenté par"
  en: 
    hero:
      title: "The Olymbyx Games"
      subtitle: "du 26 juillet au 11 août 2024"
      and: "and"
      present_by: "presented by"
</i18n>