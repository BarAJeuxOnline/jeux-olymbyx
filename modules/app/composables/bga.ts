export const useBgaGame = (gameId: MaybeRef<string | undefined>, tutorialId: MaybeRef<string | number | undefined>) => {
  const { locale } = useI18n()

  if (typeof gameId === 'string' || !gameId) {
    gameId = ref(gameId)
  }

  if (typeof tutorialId === 'string' || typeof tutorialId === 'number' || !tutorialId) {
    tutorialId = ref(tutorialId)
  }

  const medias = computed(() => {
    const base = `https://x.boardgamearena.net/data/gamemedia/${gameId.value}`
    const cacheProtection = `?h=${Date.now()}`

    return {
      cover: `${base}/banner/default.jpg${cacheProtection}`,
      title: `${base}/title/${locale.value}_2000.png${cacheProtection}`,
      box: `${base}/box/${locale.value}_280.png${cacheProtection}`,
      titleEn: `${base}/title/en_2000.png${cacheProtection}`,
      boxEn: `${base}/box/en_280.png${cacheProtection}`,
    }
  })

  return {
    medias,
    tutorial: computed(() => tutorialId.value && `https://boardgamearena.com/tutorial?game=${gameId.value}&tutorial=${tutorialId.value}` || null),
    link: computed(() => `https://boardgamearena.com/gamepanel?game=${gameId.value}`)
  }
}

export const useBgaTournament = (tournamentId: MaybeRef<string | number>, token: MaybeRef<string>) => {
  if (typeof tournamentId === 'string' || typeof tournamentId === 'number') {
    tournamentId = ref(tournamentId)
  }

  if (typeof token === 'string') {
    token = ref(token)
  }

  return {
    link: computed(() => `https://boardgamearena.com/tournament?id=${tournamentId.value}${token.value && !import.meta.dev ? `&token=${token.value}` : ''}`)
  }
}

export const useBombyx = (gameId: MaybeRef<string | undefined>) => {
  const { locale } = useI18n()

  if (typeof gameId === 'string' || !gameId) {
    gameId = ref(gameId)
  }

  return {
    link: computed(() => gameId.value ? `https://studiobombyx.com/${locale.value !== 'fr' ? `${locale.value}/` : ''}jeu/${gameId.value}` : null)
  }
}

export const useBgg = (gameId: MaybeRef<string | undefined>) => {
  if (typeof gameId === 'string' || !gameId) {
    gameId = ref(gameId)
  }

  return {
    link: computed(() => gameId.value ? `https://boardgamegeek.com/boardgame/${gameId.value}` : null)
  }
}