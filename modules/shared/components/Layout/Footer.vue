<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <footer bg-black-500 text-white slab-16 pb-18>
    <SectionContainer v-if="$slots.top">
      <slot name="top" />
    </SectionContainer>

    <SectionContainer>
      <div row-container>
        <div>
          <slot name="right" />
        </div>

        <div flex-1>
          <slot name="center" />
        </div>

        <div>
          <slot name="left" />
        </div>
      </div>
    </SectionContainer>

    <SectionContainer>
      <slot name="bottom">
        <p text-center text-sm>
          Site developé et designé par <HotLink href="https://github.com/chatondearu" text-sm>
            ChatonDeAru
          </HotLink> avec
          beaucoup de <i i-twemoji-hot-beverage icon />
        </p>
        <p text-center text-sm>
          Copyright © 2020 - {{ new Date().getFullYear() }} Bar à jeux Online.
        </p>
      </slot>
    </SectionContainer>
  </footer>
</template>
