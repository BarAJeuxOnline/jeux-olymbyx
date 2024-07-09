<script setup lang="ts">
import { useImage } from '@vueuse/core'

defineOptions({
  name: 'ImageAsync',
})

const props = defineProps<{
  src: string
  alt?: string
  asBackground?: boolean
}>()

const { isLoading, error, state: image } = useImage(props)
</script>

<template>
  <Transition name="fade">
    <div
      v-if="asBackground && !isLoading && !error"
      v-bind="$attrs"
      w-full h-full
      :style="{ backgroundImage: `url(${src})`, maxHeight: `${image?.height}px`, maxWidth: `${image?.width}px` }"
    />
    <img
      v-else-if="!asBackground && !isLoading && !error"
      v-bind="$attrs"
      w-full
      :src="src" :alt="alt || src"
    >
    <div
      v-else-if="!isLoading && error"
      v-bind="$attrs"
      w-full h-full bg-red-300 centered
    >
      <!-- error -->
      <DiceLoader text-4xl text-white />
    </div>
    <div v-else v-bind="$attrs" w-full h-full bg-green-300 centered>
      <DiceLoader text-4xl text-white />
    </div>
  </Transition>
</template>
