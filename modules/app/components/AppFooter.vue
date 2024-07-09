<script setup lang="ts">
defineOptions({
  name: 'AppFooter',
})

const { menu } = useMenu()
const { t } = useI18n()
</script>

<template>
  <footer bg-black-500 text-white slab-16 pb-18>
    <SectionContainer>
      <div row-container justify-between>
        <div>
          <h5>Bar à Jeux Online :</h5>
          <ul mt-4 list-image[url()] class="responsive">
            <li>
              {{ t('branding.learn_about_us') }}
              <HotLink href="https://barajeuxonline.fr" isExternal>
                {{ t('branding.our_website') }}
              </HotLink>
            </li>
            <li>
              {{ t('branding.join_our_server') }}
              <HotLink href="https://discord.com/servers/bar-a-jeux-online-691614580945715231" isExternal>
                Discord
              </HotLink>
            </li>
            <li>
              {{ t('branding.visit_our_account') }}
              <HotLink href="https://www.instagram.com/barajeuxonline" isExternal>
                Instagram
              </HotLink>
            </li>
            <li>
              {{ t('branding.or_on') }}
              <HotLink href="https://boardgamearena.com/group?id=6488822&sp=1eqwnk" isExternal>
                Board Game Arena
              </HotLink>
            </li>
          </ul>
        </div>

        <div>
          <h5>Bombyx :</h5>
          <ul mt-4 list-image[url()] class="responsive">
            <li>
              {{ t('branding.learn_about_us') }}
              <HotLink href="https://studiobombyx.com/" isExternal>
                {{ t('branding.our_website') }}
              </HotLink>
            </li>
            <li>
              {{ t('branding.visit_our_account') }}
              <HotLink href="https://www.instagram.com/bombyx_edition" isExternal>
                Instagram
              </HotLink>
            </li>
            <li>
              {{ t('branding.join_us') }}
              <HotLink href="https://boardgamearena.com/group?id=16033056" isExternal>
                Board Game Arena
              </HotLink>
            </li>
          </ul>
        </div>

        <nav>
          <h5>{{ t('links.title') }}</h5>

          <ul mt-4 class="responsive">
            <li v-for="item in menu" :key="item.label">
              <HotLink :to="item.to">
                {{ item.label }}
              </HotLink>
            </li>
            <li>
              <HotLink :to="{ name: 'Legal' }">
                {{ t('links.legal') }}
              </HotLink>
            </li>
          </ul>
        </nav>
      </div>
    </SectionContainer>

    <SectionContainer>
      <p text-center text-sm>
        Site developé et designé par <HotLink href="https://github.com/chatondearu" text-sm>ChatonDeAru</HotLink> avec
        beaucoup de <i i-twemoji-hot-beverage icon />
      </p>
      <p text-center text-sm>Copyright © 2020 - {{ new Date().getFullYear() }} Bar à jeux Online.</p>
    </SectionContainer>
  </footer>
</template>

<i18n lang="yaml">
fr:
  branding:
    our_website: "Notre Site"
    or_on: "Ou sur"
    learn_about_us: "Apprends en plus sur"
    join_us: "Rejoins nous sur"
    join_our_server: "Rejoins notre serveur"
    visit_our_account: "Visite notre compte"
  links:
    title: "Les raccourcis"
    legal: "Mentions légales"
</i18n>