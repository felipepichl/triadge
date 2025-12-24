import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectScrollView,
  SelectTrigger,
} from '@gluestack-ui/themed'
import { ChevronDownIcon } from 'lucide-react-native'
import { useCallback } from 'react'

type MonthSelectProps = {
  onMonthSelect: (monthNumber: string) => void
  defaultMonth?: number
}

export function MonthSelect({ onMonthSelect, defaultMonth }: MonthSelectProps) {
  const months = [...Array(12).keys()].map((i) => ({
    value: String(i + 1),
    label: new Date(2020, i).toLocaleString('pt-BR', {
      month: 'long',
    }),
  }))

  const currentMonth = defaultMonth || new Date().getMonth() + 1
  const selectedValue = String(currentMonth)
  const selectedLabel = months.find((m) => m.value === selectedValue)?.label

  const handleSelectChange = useCallback(
    (monthNumber: string) => {
      onMonthSelect(monthNumber)
    },
    [onMonthSelect],
  )

  return (
    <Select
      px="$8"
      onValueChange={handleSelectChange}
      defaultValue={selectedValue}
      initialLabel={selectedLabel}
    >
      <SelectTrigger borderRadius="$xl" h="$14" borderColor="$gray300">
        <SelectInput color="$gray100" />
        <SelectIcon as={ChevronDownIcon} mr="$2" />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent bg="$gray600">
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator bg="$gray400" />
          </SelectDragIndicatorWrapper>
          <SelectScrollView showsVerticalScrollIndicator={false}>
            {months.map((month) => (
              <SelectItem
                key={month.value}
                value={month.value}
                label={month.label}
                textStyle={{
                  color: '$gray100',
                }}
                $pressed-bg="$gray700"
                $active-bg="$gray700"
                $active-bgColor="$gray700"
                $active-backgroundColor="$gray700"
                $active-borderRadius="$xl"
                $checked-bg="$gray700"
                $checked-bgColor="$gray700"
                $checked-backgroundColor="$gray700"
                $checked-borderRadius="$xl"
                $checked-borderColor="$green500"
                $checked-borderWidth={1}
              />
            ))}
          </SelectScrollView>
        </SelectContent>
      </SelectPortal>
    </Select>
  )
}
