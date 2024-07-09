import type { StaticShortcutMap } from "@unocss/core";

export const hotlink: StaticShortcutMap = {
  clickable: 'cursor-pointer select-none',
  'hotlink': 'clickable underline underline-offset-4 transition-colors duration-200 hover:color-info',
  'hotlink-active': '',
  'hotlink-disabled': '',
}