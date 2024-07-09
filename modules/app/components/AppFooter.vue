<script setup lang="ts">
defineOptions({
  name: 'AppFooter',
})

const { menu } = useMenu()
</script>

<template>
  <footer bg-black-500 text-white slab-16 pb-18>
    <SectionContainer>
      <div row-container justify-between>
        <div>
          <h5>Bar à Jeux Online :</h5>
          <ul mt-4 list-image[url()] class="responsive">
            <li>
              Apprends en plus sur
              <HotLink href="https://barajeuxonline.fr" isExternal>
                Notre Site
              </HotLink>
            </li>
            <li>
              Rejoins notre serveur
              <HotLink href="https://discord.com/servers/bar-a-jeux-online-691614580945715231" isExternal>
                Discord
              </HotLink>
            </li>
            <li>
              Visite notre compte
              <HotLink href="https://www.instagram.com/barajeuxonline" isExternal>
                Instagram
              </HotLink>
            </li>
            <li>
              Ou sur
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
              Apprends en plus sur
              <HotLink href="https://studiobombyx.com/" isExternal>
                Notre Site
              </HotLink>
            </li>
            <li>
              Visite notre compte
              <HotLink href="https://www.instagram.com/bombyx_edition" isExternal>
                Instagram
              </HotLink>
            </li>
            <li>
              Rejoins nous sur
              <HotLink href="https://boardgamearena.com/group?id=16033056" isExternal>
                Board Game Arena
              </HotLink>
            </li>
          </ul>
        </div>

        <nav>
          <h5>Les raccourcis</h5>

          <ul mt-4 class="responsive">
            <li v-for="item in menu" :key="item.label">
              <HotLink :to="item.to">
                {{ item.label }}
              </HotLink>
            </li>
            <li>
              <HotLink :to="{ name: 'CGU' }">
                Règlement et Conditions
              </HotLink>
            </li>
            <li>
              <HotLink :to="{ name: 'Legal' }">
                Mentions Légales
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
