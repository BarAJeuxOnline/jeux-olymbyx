<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <AppHeader />
  <template v-if="error?.statusCode === 404">
    <SectionContainer bg-gradient-amber-200>
      <div i-mdi-robot-confused text-8xl text-white block />
      <div text-white>
        <h1>
          404<br />
          Page non trouvée
        </h1>
      </div>
      <div>
        <Button m="3 t8" @click="handleError" bg-white font-bold>
          Vite on repart
        </Button>
      </div>
    </SectionContainer>
  </template>
  <template v-else>
    <h1>{{ error?.statusCode }}</h1>

    {{ error?.message }}

    <Button m="3 t8" @click="handleError" bg-white font-bold>
      Vite on repart
    </Button>
  </template>
</template>
