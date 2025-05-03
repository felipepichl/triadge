import { DatePicker } from '@components/GenericFormAndFileds/Fileds/DatePicker'
import { Input } from '@components/GenericFormAndFileds/Fileds/Input'
import { VStack } from '@gluestack-ui/themed'
import { useMonetaryMask } from '@hooks/useMonetaryMask'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'

import { CategorySelect } from '../Fileds/CategorySelect'

const categorias = Array.from({ length: 8 }, (_, index) => {
  const letra = String.fromCharCode(65 + index) // 65 = 'A'
  return {
    _id: String(index),
    description: `Categoria ${letra}`,
  }
})

export function SharedFields() {
  const { formattedValue, handleMaskChange } = useMonetaryMask()
  return (
    <VStack p="$4" gap="$4">
      <Input placeholder="Descrição" />
      <Input
        placeholder="Valor"
        keyboardType="numeric"
        value={formattedValue}
        onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
          handleMaskChange(e)
        }}
      />
      <DatePicker />
      <CategorySelect type="financialCategory" options={categorias} />
      <CategorySelect type="subcategory" options={categorias} />
    </VStack>
  )
}
