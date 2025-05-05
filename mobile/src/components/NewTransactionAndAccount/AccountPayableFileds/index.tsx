import {
  HStack,
  Select,
  SelectBackdrop,
  SelectIcon,
  SelectInput,
  SelectPortal,
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
        </SelectPortal>
      </Select>
    </VStack>
  )
}
