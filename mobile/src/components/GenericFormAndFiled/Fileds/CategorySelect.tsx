import { Button } from '@components/Button'
import {
  HStack,
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
import { useNavigation } from '@react-navigation/native'
import { StackNavigatorRoutesProps } from '@routes/app/stack.routes'
import { ChevronDownIcon, CircleFadingPlus } from 'lucide-react-native'
import { useCallback, useState } from 'react'

type CategorySelectProps = {
  type: 'financialCategory' | 'subcategory'
  options: Array<{ _id: string; description: string }>
}

export function CategorySelect({ type, options }: CategorySelectProps) {
  const [parentCategoryId, setParentCategoryId] = useState<string>('')
  const navigator = useNavigation<StackNavigatorRoutesProps>()

  const handleNewCategoryOrSubcategory = useCallback(() => {
    navigator.navigate('newFinancialCategoryOrSubcategory', {
      type,
      parentCategoryId,
    })
  }, [navigator, type, parentCategoryId])

  return (
    <HStack alignItems="center">
      <Select
        flex={1}
        onValueChange={(value) => {
          setParentCategoryId(value)
        }}
      >
        <SelectTrigger borderRadius="$xl" h="$14" borderColor="$gray300">
          <SelectInput
            placeholder={
              type === 'financialCategory' ? 'Categorias' : 'Subcategorias'
            }
            px="$8"
            color="$gray100"
          />
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
                  value={item._id}
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

      <Button
        variant="outline"
        type="icon"
        icon={CircleFadingPlus}
        ml="$2"
        h="$14"
        w="$14"
        onPress={handleNewCategoryOrSubcategory}
        disabled={parentCategoryId === ''}
        opacity={parentCategoryId === '' ? '$30' : '$100'}
      />
    </HStack>
  )
}
