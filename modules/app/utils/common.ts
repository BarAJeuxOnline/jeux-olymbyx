import { format, parseISO } from 'date-fns'
import { DATES_FORMATS } from './constants'

export function isString(value: string): true
export function isString(value: any): boolean {
  return typeof value === 'string' || value instanceof String
}

export const lowercase = (v: any) => String(v).toLowerCase()

export const uppercase = (v: any) => String(v).toUpperCase()

interface FormatLocalizationOptions {
  locale?: string
}

const DateFormatInputStr: Partial<Record<DATES_FORMATS, Intl.DateTimeFormatOptions>> = {
  // {
  //  day: 'numeric' | '2-digit',
  // }
  [DATES_FORMATS.DAY]: { // 'Apr 16'
    month: 'short',
    day: 'numeric',
  },
  [DATES_FORMATS.MONTH]: { // 'Apr 2024'
    month: 'short',
    year: 'numeric',
  },
  [DATES_FORMATS.FULL]: { // Apr 16, 2024
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  },
  [DATES_FORMATS.SHORT]: { // fr: 04/16/2024 en: 04/16/24
    dateStyle: 'short',
  },
}

export type FormatDateOptions = Intl.DateTimeFormatOptions | DATES_FORMATS | string

export function formatDate(date: Date | string | number, formatOptions: FormatDateOptions = DATES_FORMATS.DEFAULT, locale: string = 'en') {
  let objOptions

  if (!(date instanceof Date)) {
    date = new Date(date)
  }

  if (typeof formatOptions === 'object') {
    objOptions = formatOptions
  } else if (formatOptions in DateFormatInputStr) {
    objOptions = DateFormatInputStr[formatOptions as DATES_FORMATS]
  }

  if (objOptions) {
    return new Intl.DateTimeFormat(locale, {
      ...objOptions,
    }).format(date)
  }

  if (typeof formatOptions === 'string') {
    return format(date, formatOptions)
  }

  return format(date, DATES_FORMATS.DEFAULT)
}

export function formatIsoDate(dateIso: string, formatOptions: FormatDateOptions) {
  return formatDate(parseISO(dateIso), formatOptions)
}

export function formatDuration(nbrSeconde: number): string {
  nbrSeconde = +nbrSeconde

  if (nbrSeconde < 0) {
    return `- ${formatDuration(-nbrSeconde)}`
  } else {
    if (nbrSeconde < 1e-3) {
      return `${Math.floor(nbrSeconde * 1e6)}ns`
    }

    if (nbrSeconde < 1) {
      return `${Math.floor(nbrSeconde * 1e3)}µs`
    }

    if (nbrSeconde < 1000) {
      return `${Math.floor(nbrSeconde)}ms`
    }

    let rest = nbrSeconde

    const days = Math.floor(rest / (24 * 3600000))
    rest = rest % (24 * 3600000)

    const hrs = Math.floor(rest / 3600000)
    rest = rest % 3600000

    const mins = Math.floor(rest / 60000)
    rest = rest % 60000

    const secs = rest
    const str = []

    if (days > 0) {
      str.push(`${days}d`)
    }

    if (hrs > 0) {
      str.push(`${hrs}h`)
    }

    if (mins > 0) {
      str.push(`${mins}m`)
    }

    if (secs > 0) {
      const s = secs % 1000 > 0 ? (secs / 1000).toFixed(1) : secs / 1000

      str.push(`${s}s`)
    }

    return str.join(' ')
  }
}

type FormatNumberOptions = Intl.NumberFormatOptions & FormatLocalizationOptions

export function formatNumber(value: number, formatOptions: FormatNumberOptions = {}): string {
  return Intl.NumberFormat(formatOptions.locale || 'en', {
    maximumFractionDigits: 2,
    notation: 'standard',
    ...formatOptions,
  }).format(value)
}

export function formatAverage(v: number): string {
  if (v < 0.1 && v !== 0) {
    return `<${formatNumber(0.1, { maximumFractionDigits: 1 })}`
  }

  return formatNumber(+v, { maximumFractionDigits: 1 })
}

export function formatPercent(v: number): string {
  return `${formatAverage(v)}%`
}

export function formatDistance(val: number, options: Intl.NumberFormatOptions & { meters?: boolean } = {}): string {
  return new Intl.NumberFormat('en', {
    style: 'unit',
    unit: 'kilometer',
    ...options,
  }).format(Number(options?.meters ? val / 1000 : val))
}

export function formatMoney(val: number, options: Intl.NumberFormatOptions & { cents?: boolean } = {}): string {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'EUR',
    ...options,
  }).format(Number(options?.cents ? val / 100 : val))
}

export function kebabCase(str: string) {
  return lowercase(str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-'))
}

export function camelize(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? lowercase(word) : uppercase(word)
    })
    .replace(/\s+/g, '')
}

export function capitalize(str: string): string {
  return `${str}`.trim().replace(/^\w/, c => c.toUpperCase())
}
