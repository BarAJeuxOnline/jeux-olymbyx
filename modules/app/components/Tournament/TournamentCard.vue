<script setup lang="ts">
import { useImage } from '@vueuse/core'

defineOptions({
  name: 'TournamentCard',
})

const props = defineProps<{
  title: string
  date: string
  bgaGameId: string
  bgaTournamentId: string | number
  bgaToken: string
  bombyxId?: string
  bggId?: string
  bajo?: boolean
  body: any
  inline?: boolean
}>()

const { bgaGameId, bgaTournamentId, bgaToken, bombyxId, bggId } = toRefs(props)

const { medias } = useBgaGame(bgaGameId)
const { link } = useBgaTournament(bgaTournamentId, bgaToken)
const { link: bombyxLink } = useBombyx(bombyxId)
const { link: bggLink } = useBgg(bggId)

const { t, locale } = useI18n()

const { isLoading, error } = useImage({ src: medias.value.title })
const today = formatDate(Date.now())
</script>

<template>
  <div rounded-10 overflow-hidden bg-white shadow-lg :class="{
    'row-container': inline
  }">
    <div :style="{
      backgroundImage: `url(${medias.cover})`,
    }" aspect-video bg-cover bg-center slab-16 flex-1>
      <div :style="{
        backgroundImage: `url(${error ? medias.titleEn : medias.title})`,
      }" aspect-video bg-cover bg-center>
        {{ medias.title ? '' : title }}
      </div>
      <h3 font-serif text-white text-shadow-md>
        <Icon name="i-mdi-trophy" text-amber mr-4 />{{ formatDate(date, DATES_FORMATS.FULL, locale) }}
      </h3>
    </div>

    <div flex-1 flex flex-col>
      <div flex-1 slab-8>
        <h5>{{ t('tournament_informations') }}</h5>
        <p font-600 text-black-300>{{ t('tournament_date', { date: formatDate(date, DATES_FORMATS.FULL, locale)}) }}</p>
        <ContentRendererMarkdown :value="{ body }" />
      </div>

      <div slab-8 row-container flex-wrap gap-4 font-600>
        <Button bg-amber-500 text-white :href="link" v-if="date >= today">
          {{ t('button.register') }}
        </Button>

        <!-- <Button v-if="rules">
          <Icon mr-2 name="i-mdi-pencil-ruler" />{{ t('button.rules') }}
        </Button> -->

        <Button v-if="bombyxLink || bggLink" :href="bombyxLink || bggLink">
          {{ t('button.more', { game: title }) }}
        </Button>

        <Button v-if="bajo" btn-primary href="https://discord.gg/barajeuxonline">
          {{ t('button.bajo') }}<img src="/assets/logo_beige.svg" h-full py-2 ml-4 />
        </Button>
      </div>
    </div>
  </div>
</template>

<i18n lang="yaml">
  fr:
    tournament_informations: "Informations sur le tournoi"
    tournament_date: "Rendez-vous le {date} à 21h sur BGA."
    button:
      register: "S'inscrire au tournoi"
      rules: "Lire les règles"
      more: "En savoir plus sur {game}"
      bajo: "Rejoindre le Bar à Jeux Online."
</i18n>