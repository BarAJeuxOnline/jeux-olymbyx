<script setup lang="ts">
import type { RouteLocation } from 'vue-router'

defineOptions({
  name: 'Header',
})

const props = withDefaults(defineProps<{
  title?: string
  icon?: string
  to?: RouteLocation
}>(), {
  title: 'Home',
  icon: 'i-mdi-home',
})

const ariaLabel = useAriaLabel(props, ['home'])
</script>

<template>
  <header sticky top-0 inset-x-0 z-50 mb--px>
    <slot name="top" />
    <SectionContainer :padding="false">
      <div h-20 flex items-center justify-between gap-3>
        <NuxtLink :to="to || '/'" :aria-label="ariaLabel" flex-shrink-0 flex items-end>
          <slot name="home">
            <Icon v-if="icon" :name="icon" /> {{ title }}
          </slot>
        </NuxtLink>

        <div v-if="$slots.left" lg:flex-1 flex items-center gap-1.5>
          <slot name="left" />
        </div>

        <div v-if="$slots.center">
          <slot name="center" />
        </div>

        <div v-if="$slots.right" flex items-center justify-end lg:flex-1 gap-1.5>
          <slot name="right" />
        </div>
      </div>

      <Panel v-if="$slots.panel">
        <slot name="panel" />
      </Panel>
    </SectionContainer>
    <slot name="bottom" />
  </header>
</template>
