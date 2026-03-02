import { priceFormatter } from '@/util/formatter'

import { CardDescription } from '../ui/card'

type InfoRowProps = {
  label: string
  value: number
  isValueFormatted?: boolean
}

export function InfoRow({
  label,
  value,
  isValueFormatted = true,
}: InfoRowProps) {
  return (
    <section className="flex flex-row justify-between">
      <CardDescription>{label}</CardDescription>
      <CardDescription className="font-bold text-gray-500 dark:text-slate-200">
        {isValueFormatted ? priceFormatter.format(value) : value}
      </CardDescription>
    </section>
  )
}
