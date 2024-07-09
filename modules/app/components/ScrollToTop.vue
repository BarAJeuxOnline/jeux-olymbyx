<script setup lang="ts">
defineOptions({
  name: 'ScrollToTop',
})

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <Button btn rounded-full @click="scrollToTop" fixed bottom-18 right-4 md:right-8>
    <i i-mdi-arrow-up />
  </Button>
</template>