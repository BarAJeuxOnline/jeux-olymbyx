import { entriesToCss } from '@unocss/core'
import type { Preset } from 'unocss'
import chroma from 'chroma-js'

import shortcuts from './shortcuts'

const isString = (value: any) => typeof value === 'string' || value instanceof String

function toCSS([root, obj]: [string, Record<string, any>]): string {
  const css = Object.entries(obj).map(([key, value]) => {
    if (typeof value === 'object') {
      return `${key} {
  ${entriesToCss(Object.entries(value))}
}`
    }

    return entriesToCss([[key, value]])
  }).join('\n  ')

  return `${root} {
  ${css}
}`
}

const fontSize = {
  'xs': 0.75,
  'sm': 0.875,
  'base': 1,
  'lg': 1.25,
  'xl': 1.5,
  '2xl': 2,
  '3xl': 2.5,
  '4xl': 2.875,
  '5xl': 3.25,
  '6xl': 4,
}

const sizes = {
  'xs': 6,
  'sm': 8,
  'md': 12,
  'lg': 16,
  'xl': 20,
  '2xl': 24,
}

type Variants = keyof typeof variantsColors
const variantsColors = {
  default: {
    bg: 'black-500/20',
    text: 'white',
    border: 'none',
  },
  info: 'blue',
  success: 'emerald',
  danger: 'red',
  warning: 'amber',
}

function getGradient(from: string, to: string, orientation = '180deg') {
  const colors = chroma
    .scale([from, to])
    .mode('lch')
    .domain([0, 100])
    .colors(10)

  const gradient = colors
    .reduce((acc: string[], color: string, index: number) => {
      acc.push(`${color} ${index * 10}%`)
      return acc
    }, [])
    .join(', ')

  return `linear-gradient(${[orientation, gradient].join(', ')})`
}

function extractColor(extract: string): [string, number] {
  const [color, saturation] = extract.split('-')
  return [color, saturation ? Number(saturation) : 500]
}

function themedColor(extract: string, theme: any): string | null {
  const [color, saturation] = extractColor(extract)
  const res = saturation ? theme.colors[color]?.[`${saturation}`] : theme.colors[color]
  return res?.DEFAULT || res
}

export default function presetBajoTheme(): Preset {
  return {
    name: 'bajo-preset',
    theme: {
      rounded: {
        10: '10px',
      },
      colors: {
        beige: {
          DEFAULT: '#E0CDA7',
          50: '#FBF9F4',
          100: '#F6F0E5',
          200: '#F0E6D3',
          300: '#E9DCC1',
          400: '#E5D5B4',
          500: '#E0CDA7',
          600: '#DCC89F',
          700: '#D8C196',
          800: '#D3BA8C',
          900: '#CBAE7C',
          A100: '#FFFFFF',
          A200: '#FFFFFF',
          A400: '#FFF7EA',
          A700: '#FFEED0',
        },
        green: {
          DEFAULT: '#4D6750',
          50: '#EAEDEA',
          100: '#CAD1CB',
          200: '#A6B3A8',
          300: '#829585',
          400: '#687E6A',
          500: '#4D6750',
          600: '#465F49',
          700: '#3D5440',
          800: '#344A37',
          900: '#253927',
          A100: '#83FF91',
          A200: '#50FF63',
          A400: '#1DFF36',
          A700: '#03FF1',
        },
        black: {
          DEFAULT: '#060D10',
          50: '#E1E2E2',
          100: '#B4B6B7',
          200: '#838688',
          300: '#515658',
          400: '#2B3134',
          500: '#060D10',
          600: '#050B0E',
          700: '#04090C',
          800: '#030709',
          900: '#020305',
          A100: '#4D4DFF',
          A200: '#1A1AFF',
          A400: '#0000E6',
          A700: '#0000CD',
        },
        discord: {
          500: 'rgb(88, 101, 242)',
        },
        ...Object.entries(variantsColors).reduce((acc: any, [key, value]) => {
          acc[key] = typeof value === 'string' ? value : value.bg
          return acc
        }, {}),
      },
      fontSize: Object.entries(fontSize).reduce((acc: any, [key, value]) => {
        acc[key] = [`${value}rem`, `${value + 0.125}rem`]
        return acc
      }, {}),
    },
    rules: [
      [
        /^bg-gradient-(.*)$/,
        ([_, c], { theme }) => {
          const color = themedColor(c, theme)

          if (!color)
            return {}

          return {
            'background-image': getGradient(color, chroma(color).darken(0.5).saturate().hex()),
          }
        },
      ],
      [
        /^bg-gradient-from-(\w+)-to-(\w+)$/,
        ([_, c1, c2], { theme }) => {
          const color1 = themedColor(c1, theme)
          const color2 = themedColor(c2, theme)

          if (!color1 || !color2)
            return {}

          return {
            'background-image': getGradient(color1, color2),
          }
        },
      ],
      [
        /^border-gradient-(.*)$/,
        ([_, c], { theme }) => {
          const color = themedColor(c, theme)

          if (!color)
            return {}

          return {
            'border-image': getGradient(color, chroma(color).darken(0.5).saturate().hex()),
          }
        },
      ],
      [
        /^pattern-(fence)$/,
        ([_, name]) => {
          if (name === 'fence') {
            return {
              'background': `radial-gradient(27% 29% at right, #0000 83%,#e0cda7 85% 99%,#0000 101%) calc(25px/2) 25px,
                  radial-gradient(27% 29% at left, #0000 83%,#e0cda7 85% 99%,#0000 101%) calc(25px/-2) 25px,
                  radial-gradient(29% 27% at top, #0000 83%,#e0cda7 85% 99%,#0000 101%) 0 calc(25px/2),
                  radial-gradient(29% 27% at bottom, #0000 83%,#e0cda7 85% 99%,#0000 101%) 0 calc(25px/-2)
                  #465f49`,
              'background-size': '50px 50px',
            }
          }
        },
      ],
      [/^cutted-edge-(.*)$/, ([, c], { theme }) => {
        const color = themedColor(c, theme)

        return {
          'background-image': [
            `linear-gradient(45deg, transparent 75%, ${color} 75%)`,
            `linear-gradient(135deg, transparent 75%, ${color} 75%)`,
            `linear-gradient(-45deg, transparent 75%, ${color} 75%)`,
            `linear-gradient(-135deg, transparent 75%, ${color} 75%)`,
          ].join(', '),
          'background-size': '30px 15px',
          'background-repeat': 'repeat-y',
          'background-position': '0 0, 0 0, 100% 0, 100% 0',
        }
      }],
      [/^aspect-(\d+)\/(\d+)$/, ([, h, w]) => {
        return {
          'aspect-ratio': `${h}/${w}`,
        }
      }],
    ],
    variants: [],
    shortcuts: [
      ...shortcuts,

      // slabs
      {
        'slab-rounded': 'rounded-5 md:rounded-10 overflow-hidden',
        'slab-shadow': 'shadow-lg md:shadow-xl',
        'slab-bg': 'bg-white dark:bg-black-500/20',
        'slab-0': '!p-0 md:!p-0',
        'slab-4': 'p-2 md:p-4',
        'slab-8': 'p-4 md:p-8',
        'slab-16': 'p-8 md:p-16',
        'slab-32': 'p-16 md:p-32',
        'slab': 'slab-rounded slab-shadow slab-bg slab-4',
      },

      // Icons
      {
        icon: 'inline-flex items-center justify-center',
      },
      [
        /^icon-(xs|sm|md|lg|xl)$/,
        ([, size]) => {
          const sizeNum = sizes[size as keyof typeof sizes]
          return `h-${sizeNum} w-${sizeNum}`
        },
      ],

      // buttons
      {
        // global style
        'btn': 'rounded-[2rem] inline-flex btn-md btn-glass btn-hover btn-animation shrink-0 cursor-pointer select-none flex-wrap items-center justify-center border-transparent text-center whitespace-nowrap text-ellipsis',

        // btn states
        'btn-animation': 'active:hover:scale-95 active:hover:transition active:focus:scale-95 active:focus:transition',
        'btn-hover': 'hover:bg-opacity-90 hover:transition hover:duration-200',
        'btn-disabled': 'disabled:pointer-events-none',

        // btn styles
        'btn-glass': 'bg-black-500/20 dark:bg-white/20',
        'btn-primary': 'bg-gradient-green text-white',
        'btn-primary-dark': 'bg-gradient-greendark text-white',
      },
      [
        // btn variants
        /^btn-(default|info|success|danger|warning)(-outline)?/,
        ([, variant, outline]) => {
          const v = variantsColors[variant as Variants]
          return isString(v)
            ? `bg-${v}-100 text-${v}-700${
                outline ? ` border-1 border-${v}-500` : ''
              }`
            : `bg-${v.bg} text-${v.text}${
                outline ? ` border-1 border-${v.border}` : ''
              }`
        },
      ],
      // btn sizes
      [
        /^btn-(xs|sm|md|lg|xl|2xl)$/,
        ([, size]) => {
          const sizeNum = sizes[size as keyof typeof sizes]
          return `h-${sizeNum} min-h-[${(sizeNum / 4).toFixed(1)}rem] px-${(sizeNum / 3).toFixed(0)} text-${size === 'md' ? 'base' : size}`
        },
      ],

      // forms
      {
        'form-label': 'text-sm font-medium text-gray-700',
        'form-input-full': 'form-input w-full block',
        'form-input': 'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm',
      },

      // Alerts
      [
        /^variant-(default|info|success|danger|warning)(-border)?/,
        ([, variant, border]) => {
          const v = variantsColors[variant as Variants]
          return isString(v)
            ? `bg-${v}-100 text-${v}-700${
                border ? ` border-1 border-${v}-500` : ''
              }`
            : `bg-${v.bg} text-${v.text}${
                border ? ` border-1 border-${v.border}` : ''
              }`
        },
      ],
      {
        alert: 'variant-default-border rounded-xl p-4 shadow-sm',
        callout: 'variant-default rounded-xl p-4 mt-4',
      },

      // Link
      {
        clickable: 'cursor-pointer select-none',
        link: 'clickable underline underline-offset-4 transition-colors duration-200 hover:color-info',
      },
    ],
    preflights: [
      {
        getCSS: ({ theme }) => {
          // const bpt = [
          //   ['sm', '640px'],
          //   ['md', '768px'],
          //   ['lg', '1024px'],
          //   ['xl', '1280px'],
          //   ['2xl', '1536px'],
          // ]

          const titles = {
            'h1': {
              'xs': '3xl',
              'md': '5xl',
              '2xl': '6xl',
            },
            'h2': {
              'xs': '2xl',
              'md': '4xl',
              '2xl': '5xl',
            },
            'h3': {
              'xs': 'xl',
              'md': '3xl',
              '2xl': '4xl',
            },
            'h4': {
              'xs': 'lg',
              'md': '2xl',
              '2xl': '3xl',
            },
            'h5': {
              'xs': 'base',
              'md': 'xl',
              '2xl': '2xl',
            },
            'p, a.responsive, ul.responsive': {
              'xs': 'sm',
              'md': 'base',
              '2xl': 'xl',
            },
          }

          const titi = Object.entries(titles).reduce((acc: any, [title, value]) => {
            Object.entries(value).forEach(([breakpoint, size]) => {
              acc[breakpoint] = acc[breakpoint] || {}
              acc[breakpoint][title] = {
                'font-size': theme.fontSize[size][0],
                'line-height': theme.fontSize[size][1],
              }
            })
            return acc
          }, {})

          return Object.entries({
            'h1,h2,h3,h4,h5,p': {
              'margin-top': theme.spacing.DEFAULT,
            },
            'h1,h2,h3,h4,h5': {
              'font-weight': 900,
            },
            ...(titi.xs || {}),
            [`@media (min-width: ${theme.breakpoints.md})`]: {
              ...(titi.md || {}),
            },
            // [`@media (min-width: ${theme.breakpoints.xl})`]: {
            //   ...(titi.xl || {}),
            // },
            [`@media (min-width: ${theme.breakpoints['2xl']})`]: {
              ...(titi['2xl'] || {}),
            },
            'a': {
              cursor: 'pointer',
            },
            'img,svg': {
              'max-width': '100%',
              'image-rendering': 'crisp-edges',
            },
            'table': {
              'border': `1px solid ${theme.colors.gray[100]}`,
              'border-collapse': 'collapse',
              'width': '100%',
            },
            'table th,table td': {
              border: `1px solid ${theme.colors.gray[100]}`,
              padding: theme.spacing.DEFAULT,
            },
            'table td': {
              'font-weight': 700,
            },
          })
            .map(toCSS)
            .join('')
        },
      },
    ],
  }
}
