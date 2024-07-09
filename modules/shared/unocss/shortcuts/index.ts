import type { UserShortcuts } from '@unocss/core'

import { hotlink } from './hotlink'
import { typography } from './typography'
import { containers } from './containers'
import { bento, bentoSizes } from './bento'

export default [
  hotlink,
  typography,
  containers,
  bento,
  ...bentoSizes,
] as UserShortcuts[]

// StaticShortcutMap | StaticShortcut | DynamicShortcut<object>