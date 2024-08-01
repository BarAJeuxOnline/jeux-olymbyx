<script setup lang="ts">
useHead({
  title: 'Jeux Olymbyx - Les Jeux Olympiques de Bombyx',
  meta: [
    { name: 'description', content: "La maison d'édition Bombyx en partenariat avec le Bar à Jeux Online vous propose de participer à des tournois de leur jeux de société sur Board Game Arena.Les tournois sont ouverts à tous et se dérouleront du 26 juillet au 11 août 2024. Pour chaque jours des JO retrouvez un tournoi sur un jeu différent édité par Bombyx et disponible sur Board Game Arena." },
    { name: 'theme-color', content: '#ffffff' },
    { name: 'twitter:site', content: '@BarAJeuOnline' },
    { name: 'og:site_name', content: 'Jeux Olymbyx - par le Bar à Jeux Online' },
    { name: 'og:title', content: 'Jeux Olymbyx - par le Bar à Jeux Online' },
    {
      name: 'og:description', content: "La maison d'édition Bombyx en partenariat avec le Bar à Jeux Online vous propose de participer à des tournois de leur jeux de société sur Board Game Arena.Les tournois sont ouverts à tous et se dérouleront du 26 juillet au 11 août 2024. Pour chaque jours des JO retrouvez un tournoi sur un jeu différent édité par Bombyx et disponible sur Board Game Arena." },
    { name: 'og:image', content: 'https://jeux-olymbyx.barajeuxonline.fr/jeux_olymbyx_rs.webp' },
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
