import { CategorySelect } from '@components/GenericFormAndFiled/Fileds/CategorySelect'
import { DatePicker } from '@components/GenericFormAndFiled/Fileds/DatePicker'
import { StackHeader } from '@components/Headers/StackHeader'
import { Input } from '@components/Input'
import { VStack } from '@gluestack-ui/themed'

export function NewTransaction() {
  const categorias = Array.from({ length: 8 }, (_, index) => {
    const letra = String.fromCharCode(65 + index) // 65 = 'A'
    return {
      _id: String(index),
      description: `Categoria ${letra}`,
    }
  })

  return (
    <VStack flex={1}>
      <StackHeader title="Nova Transação" />

      <VStack p="$4" gap="$4">
        <Input placeholder="Descrição" />
        <Input placeholder="Valor" />
        <DatePicker />
        <CategorySelect placeholder="Categoria" options={categorias} />
      </VStack>
    </VStack>
  )
}
