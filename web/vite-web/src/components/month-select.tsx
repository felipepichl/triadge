import { useCallback } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

type MonthSelectProps = {
  onMonthSelect: (monthNumber: string) => void
  defaultMonth?: number
}

export function MonthSelect({ onMonthSelect, defaultMonth }: MonthSelectProps) {
  const currentMonth = defaultMonth || new Date().getMonth() + 1

  const handleSelectChange = useCallback(
    (monthNumber: string) => {
      onMonthSelect(monthNumber)
    },
    [onMonthSelect],
  )

  return (
    <Select
      onValueChange={handleSelectChange}
      defaultValue={String(currentMonth)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione o mês" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {[...Array(12).keys()].map((i) => (
            <SelectItem key={i + 1} value={String(i + 1)}>
              {new Date(0, i).toLocaleString('pt-BR', {
                month: 'long',
              })}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
