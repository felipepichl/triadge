import { DatePicker } from '@components/GenericFormAndFiled/Fileds/DatePicker'
import { StackHeader } from '@components/Headers/StackHeader'
import { Input } from '@components/Input'
import { VStack } from '@gluestack-ui/themed'

export function NewTransaction() {
  return (
    <VStack flex={1}>
      <StackHeader title="Nova Transação" />

      <VStack p="$4" gap="$4">
        <Input placeholder="Descrição" />
        <Input placeholder="Valor" />
        <DatePicker />
      </VStack>
    </VStack>
  )
}
