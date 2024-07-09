<script setup lang="ts">
defineOptions({
  name: 'SectionContainer',
})

withDefaults(defineProps<{
  padding?: boolean
}>(), {
  padding: true,
})
</script>

<template>
  <div
    :class="{
      'lg:slab-32 slab-16': padding,
    }"
  >
    <section centered-container>
      <slot />
    </section>
  </div>
</template>
