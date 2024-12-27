import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function moneyFormat(x?: number, decimal: number = 2) {
  if (!x) {
    x = 0
  }
  let ondalik = 1
  Array.from(Array(decimal).keys()).forEach(() => ondalik = ondalik * 10)
  x = Math.round(ondalik * x) / ondalik

  return x.toLocaleString("en-US") + (x - Math.floor(x) == 0 && decimal > 0 ? '.' + '0'.repeat(decimal) : '')
  // return x.toLocaleString() + (x - Math.floor(x) == 0 ? '.00' : '')


}


export function currSymbol(currency?: string) {
  switch (currency) {
    case 'TL':
    case 'TRY':
      return '₺'
    case 'USD':
      return '$'
    case 'EUR':
    case 'EURO':
      return '€'
    default:
      return currency
  }
}

export function yesterday() {
  return new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().substring(0, 10)
}

export function today() {
  return new Date().toISOString().substring(0, 10)
}

export function cNumber(val?: any) {
  return isNaN(Number(val)) ? 0 : Number(val)
}

export function s3ImageUrl(_id?: string, w?: number) {
  if (_id?.length == 24) {
    return `${process.env.NEXT_PUBLIC_API_URI}/s3/image/show/${_id}/${w || 400}`
  } else {
    return ''
  }

}

export function relativeTime(date?: string | any) {
  const rtf = new Intl.RelativeTimeFormat('default', { style: 'short' })
  const t = new Date(date)
  let diff = Math.round(new Date().getTime() / 1000) - Math.round(t.getTime() / 1000)
  if (!date) return 'date-err'
  if (diff < 60) {
    return rtf.format(diff * -1, 'seconds')
  } else if (diff >= 60 && diff < 3600) {
    return rtf.format(Math.floor(diff / 60) * -1, 'minutes')
  } else if (diff >= 3600 && diff < 86400) {
    return rtf.format(Math.floor(diff / 3600) * -1, 'hours')
  } else if (diff >= 86400 && diff < 86400 * 7) {
    return rtf.format(Math.floor(diff / 86400) * -1, 'days')
  } else {
    return rtf.format(Math.floor(diff / (86400 * 7)) * -1, 'weeks')
  }

}