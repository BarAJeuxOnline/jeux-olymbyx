<script setup lang="ts">
useHead({
  title: 'Jeux Olymbyx - Les Jeux Olympiques de Bombyx',
  meta: [
    { name: 'description', content: 'Le BAJO est un lieu de rencontre en ligne pour des personnes intéressées par le monde ludique. Nous jouons des jeux de société d’ambiance aux jeux de stratégies (en passant par des jeux coopératifs, jeux de dessins, etc … )' },
    { name: 'theme-color', content: '#ffffff' },
    { name: 'twitter:site', content: '@BarAJeuOnline' },
    { name: 'og:site_name', content: 'Jeux Olymbyx - par le Bar à Jeux Online' },
    { name: 'og:title', content: 'Jeux Olymbyx - par le Bar à Jeux Online' },
    { name: 'og:description', content: 'Le BAJO est un lieu de rencontre en ligne pour des personnes intéressées par le monde ludique. Nous jouons des jeux de société d’ambiance aux jeux de stratégies (en passant par des jeux coopératifs, jeux de dessins, etc … )' },
    { name: 'og:image', content: 'https://barajeuxonline.fr/assets/bombyx_greek_columns.webp' },
    { name: 'og:url', content: 'https://jeux-olymbyx.barajeuxonline.fr/' },
    { name: 'og:type', content: 'website' },
    { name: 'og:locale', content: 'fr_FR' },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg',
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
