import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  const dt = new Date(date)
  const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000)

  return format(dtDateOnly, "dd 'de' MMMM',' yyyy", {
    locale: ptBR,
  })
}
