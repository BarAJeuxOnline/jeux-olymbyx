import type { DynamicShortcut, StaticShortcutMap } from "@unocss/core"

export const bento: StaticShortcutMap = {
  'bento': 'grid gap-4 md:gap-8',
  'bento-auto': 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
  'bento-end': 'col-end-3 sm:col-end-4 md:col-end-5 lg:col-end-6 xl:col-end-7',
  'bento-rice': 'transition-all duration-200',
  'bento-side': 'grid transition-all duration-200',
}

export const bentoSizes: DynamicShortcut[] = [
  [
    /^bento-(\d+)$/,
    ([, nbr]) => {
      return `grid-cols-${Number(nbr)}`
    },
  ],
  [
    /^bento-size-(-?\d+)x?(-?\d+)?$/,
    ([, nbrCol, nbrRow]) => {
      if (!nbrRow || nbrCol === nbrRow)
        return `col-span-${nbrCol} row-span-${nbrCol} aspect-square`

      return `col-span-${nbrCol} row-span-${nbrRow} aspect-${nbrCol}/${nbrRow}`
    },
  ],
]