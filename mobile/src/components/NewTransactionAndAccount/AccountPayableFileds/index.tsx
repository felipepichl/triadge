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
  Switch,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { ChevronDownIcon } from 'lucide-react-native'

import { gluestackUIConfig } from '../../../../config/gluestack-ui.config'

export function AccountPayableFileds() {
  const { green500, gray500 } = gluestackUIConfig.tokens.colors

  return (
    <VStack px="$4" gap="$4">
      <HStack
        borderRadius="$xl"
        borderWidth="$1"
        borderColor="$gray300"
        h="$14"
        px="$8"
        alignItems="center"
      >
        <Switch
          size="lg"
          mr="$4"
          trackColor={{
            false: gray500,
            true: green500,
          }}
        />
        <Text color="$gray300">Gasto Recorrente</Text>
      </HStack>
      <Select>
        <SelectTrigger borderRadius="$xl" h="$14" borderColor="$gray300">
          <SelectInput
            placeholder="Quantidade de Parcelas"
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
              {Array.from({ length: 12 }, (_, index) => index + 1).map(
                (value) => (
                  <SelectItem
                    key={value}
                    value={value.toString()}
                    label={value.toString()}
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
                ),
              )}
            </SelectScrollView>
          </SelectContent>
        </SelectPortal>
      </Select>
    </VStack>
  )
}
