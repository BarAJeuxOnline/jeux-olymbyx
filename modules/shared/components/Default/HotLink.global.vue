<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { NuxtLinkProps } from '#app'

export interface HotLinkProps extends NuxtLinkProps {
  /**
   * The element or component this component should render as when not a link.
   * @defaultValue 'button'
   */
  as?: any
  /**
   * The type of the button when not a link.
   * @defaultValue 'button'
   */
  type?: ButtonHTMLAttributes['type']
  disabled?: boolean
  active?: boolean
  exact?: boolean
  exactQuery?: boolean
  exactHash?: boolean
  inactiveClass?: string
  custom?: boolean
  raw?: boolean
  class?: any
}

export interface HotLinkSlots {
  default(props: { active: boolean }): any
}
</script>

<script setup lang="ts">
import { isEqual } from 'ohash'
import { useForwardProps } from 'radix-vue'
import { reactiveOmit } from '@vueuse/core'

defineOptions({
  name: 'HotLink',
  inheritAttrs: false,
})

// const linkStyle = useTheme('link')

const props = withDefaults(defineProps<HotLinkProps>(), {
  as: 'button',
  type: 'button',
  active: undefined,
  activeClass: '',
  inactiveClass: ''
})

defineSlots<HotLinkSlots>()

const route = useRoute()
const nuxtLinkProps = useForwardProps(reactiveOmit(props, 'as', 'type', 'disabled', 'active', 'exact', 'exactQuery', 'exactHash', 'activeClass', 'inactiveClass'))

function isLinkActive(slotProps: any) {
  if (props.active !== undefined) {
    return props.active
  }

  if (props.exactQuery && !isEqual(slotProps.route.query, route.query)) {
    return false
  }
  if (props.exactHash && slotProps.route.hash !== route.hash) {
    return false
  }

  if (props.exact && slotProps.isExactActive) {
    return true
  }

  if (!props.exact && slotProps.isActive) {
    return true
  }

  return false
}

function resolveLinkClass(slotProps: any) {
  const active = isLinkActive(slotProps)

  if (props.raw) {
    return [props.class, active ? props.activeClass : props.inactiveClass]
  }

  return [props.class, 'hotlink', {
    'hotlink-active': active,
    'hotlink-disabled': props.disabled
  }]
}
</script>

<template>
  <NuxtLink v-slot="slotProps" v-bind="nuxtLinkProps" custom>
    <template v-if="custom">
      <slot v-bind="{ ...$attrs, ...slotProps, as, type, disabled, active: isLinkActive(slotProps) }" />
    </template>
    <LinkBase v-else v-bind="{ ...$attrs, ...slotProps, as, type, disabled }" :class="resolveLinkClass(slotProps)">
      <slot v-bind="{ ...slotProps, as, type, disabled, active: isLinkActive(slotProps) }" />
    </LinkBase>
  </NuxtLink>
</template>
