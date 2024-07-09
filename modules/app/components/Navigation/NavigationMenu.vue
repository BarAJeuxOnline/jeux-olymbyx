<script setup lang="ts">
defineOptions({
  name: 'NavigationMenu',
})

const { menu } = useMenu()
</script>

<template>
  <nav p-2 gap-2 overflow-hidden flex>
    <Button v-for="link in menu" :to="link.to" exact bg-orange text-white font-bold>
      {{ link.label }}
    </Button>
  </nav>
</template>
