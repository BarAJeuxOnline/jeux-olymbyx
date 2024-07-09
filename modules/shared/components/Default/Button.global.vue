<script setup lang="ts">
defineOptions({
  name: 'Button',
})
</script>

<template>
  <NuxtLink v-if="$attrs.to" exact v-bind="$attrs" btn>
    <slot />
  </NuxtLink>
  <a v-else-if="$attrs.href" target="_blank" rel="noopener noreferrer" v-bind="$attrs" btn>
    <slot />
  </a>
  <button v-else btn>
    <slot />
  </button>
</template>
