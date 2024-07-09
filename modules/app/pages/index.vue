<script setup lang="ts">
definePageMeta({
  name: 'Home',
})


const { t, locale } = useI18n()

const today = formatDate(Date.now())

const { data: tournaments } = await useAsyncData('tournaments', () => queryContent(locale.value, 'tournaments').sort({ date: 1 }).find())

const tournamentOfTheDay = computed(() => {
  return tournaments.value?.find((tournament) => formatDate(tournament.date) === today) || null
})
const nextTournaments = computed(() => {
  return tournaments.value?.filter((tournament) => formatDate(tournament.date) > today) || []
})
const pastTournaments = computed(() => {
  return tournaments.value?.filter((tournament) => formatDate(tournament.date) < today) || []
})
</script>

<template>
  <AppHeader />

  <SectionContainer v-motion-slide-visible-once-top>
    <div row-container>
      <img src="/assets/logo_jo_paris.svg" alt="Logo JO Paris 2024" />
      <div>
        <h3>{{ t('section_jo.title') }}</h3>
        <h5>{{ t('section_jo.subtitle') }}</h5>
        <p>
          {{ t('section_jo.description') }}
        </p>
        <p text-help>
          {{ t('section_jo.not_linked_to_jo') }}
        </p>
      </div>
    </div>
  </SectionContainer>

  <SectionContainer bg-gradient-orange-300 text-white v-motion-slide-visible-once-right>
    <h1 text-shadow-md font-serif>
      {{ t('section_tournaments.title') }}
    </h1>

    <h5 text-shadow-md font-serif>
      {{ t('section_tournaments.subtitle') }}
    </h5>

    <p text-shadow-md>
      {{ t('section_tournaments.description') }}
    </p>
  </SectionContainer>

  <SectionContainer>
    <template v-if="tournamentOfTheDay">
      <h1 font-serif text-shadow-md v-motion-slide-visible-once-left>
        {{ t('section_today.title') }}
      </h1>
      <TournamentCard v-bind="tournamentOfTheDay" section-8 inline />
    </template>

    <template v-else>
      <h1 font-serif text-shadow-md>
        {{ t('section_today.title') }}
      </h1>
      <p>
        {{ t('section_today.no_tournament') }}
      </p>
    </template>
  </SectionContainer>

  <SectionContainer v-if="nextTournaments.length > 0" bg-gradient-amber-300>
    <h1 mt-0 text-white font-serif text-shadow-md v-motion-slide-visible-once-left>
      {{ t('section_next_tournaments.title') }}
    </h1>

    <div section-8 grid lg:grid-cols-2 gap-8 lg:gap-16>
      <template v-for="tournament in nextTournaments">
        <TournamentCard v-bind="tournament" />
      </template>
    </div>
  </SectionContainer>

  <SectionContainer v-if="pastTournaments.length > 0">
    <h1 font-serif text-shadow-md v-motion-slide-visible-once-left>
      {{ t('section_past_tournaments.title') }}
    </h1>

    <div section-8 grid lg:grid-cols-2 gap-8 lg:gap-16>
      <template v-for="tournament in pastTournaments">
        <TournamentCard v-bind="tournament" />
      </template>
    </div>
  </SectionContainer>
</template>

<i18n lang="yaml">
fr:
  home:
    bento_title: "Découvre nous !"
  section_jo:
    title: "À l'occasion des Jeux Olympiques de Paris 2024"
    subtitle: "Venez participer à nos tournois de jeux de société"
    description: "Le studio Bombyx vous propose de participer à des tournois de leur jeux de société sur Board Game Arena. Les tournois sont ouverts à tous et se dérouleront du 26 juillet au 11 août 2024. Pour chaques jours des JO retrouvez un tournoi sur un jeu différent édité par Bombyx et disponible sur Board Game Arena."
    not_linked_to_jo: "L'évènement \"Jeux Olymbyx\" n'est en aucun cas lié de prés ou de loin aux Jeux Olympiques de Paris 2024."
  section_tournaments:
    title: "Programme des tournois"
    subtitle: "Tous les tournois commencent à 21h. Les inscriptions seront closes au lancement des tournois."
    description: ""
  section_today:
    title: "Tournoi du jour"
    no_tournament: "Le premier tournoi des Jeux Olymbyx commence le 26 Juillet à 21h. Inscrivez-vous dès maintenant !"
  section_next_tournaments:
    title: "Prochains tournois"
  section_past_tournaments:
    title: "Tournois terminés"
</i18n>