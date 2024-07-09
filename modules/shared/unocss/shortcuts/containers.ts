import type { StaticShortcutMap } from "@unocss/core";

export const containers: StaticShortcutMap = {
  'centered': 'flex items-center justify-center',
  'border-container': 'border-1 border-grey-100 rounded-lg',
  'centered-container': 'container mx-auto',
  'row-container': 'flex md:flex-row flex-col gap-4 md:gap-8',
  'section-0': '!my-0 md:!my-0',
  'section-4': 'my-2 md:my-4',
  'section-8': 'my-4 md:my-8',
  'section-16': 'my-8 md:my-16',
  'section-32': 'my-16 md:my-32',
}
