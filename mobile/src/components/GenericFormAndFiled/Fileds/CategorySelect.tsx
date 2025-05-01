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

type CategorySelectProps = {
  placeholder: string
  options: Array<{ _id: string; description: string }>
}

export function CategorySelect({ placeholder, options }: CategorySelectProps) {
  return (
    <Select>
      <SelectTrigger borderRadius="$xl" h="$14" borderColor="$gray300">
        <SelectInput placeholder={placeholder} px="$8" color="$gray100" />
        <SelectIcon as={ChevronDownIcon} mr="$2" />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent bg="$gray600">
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator bg="$gray400" />
          </SelectDragIndicatorWrapper>
          <SelectScrollView showsVerticalScrollIndicator={false}>
            {options.map((item) => (
              <SelectItem
                key={item._id}
                value={item.description}
                label={item.description}
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
