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
      'slab-32': padding,
    }"
  >
    <section centered-container>
      <slot />
    </section>
  </div>
</template>
