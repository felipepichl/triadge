import { priceFormatter } from '@/shared/util/formatter'

import { CardDescription } from '@/shared/components/ui/card'

type InfoRowProps = {
  label: string
  value: number
  isValueFormatted?: boolean
}

function InfoRow({ label, value, isValueFormatted }: InfoRowProps) {
  return (
    <div className="flex flex-row justify-between">
      <CardDescription>{label}</CardDescription>
      <CardDescription className="truncate font-semibold text-gray-500 dark:text-slate-200">
        {isValueFormatted ? priceFormatter.format(value) : value}
      </CardDescription>
    </div>
  )
}

export { InfoRow }
