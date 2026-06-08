import { DatePicker } from '@components/GenericFormAndFileds/Fileds/DatePicker'
import { Input } from '@components/GenericFormAndFileds/Fileds/Input'
import { VStack } from '@components/ui/vstack'
import { useMonetaryMask } from '@hooks/useMonetaryMask'
import { useCallback, useEffect, useState } from 'react'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'

import { apiListFinancialCategories } from '@/api/app/financial-categories/list-categories'
import { apiListSubcategories } from '@/api/app/financial-categories/list-subcategories'

import { CategorySelect } from '../Fileds/CategorySelect'

type SharedFieldsProps = {
  onDescriptionChange?: (value: string) => void
  onAmountChange?: (value: number) => void
  onDateChange?: (date: Date) => void
  onCategoryChange?: (categoryId: string) => void
  onSubcategoryChange?: (subcategoryId: string) => void
}

export function SharedFields({
  onDescriptionChange,
  onAmountChange,
  onDateChange,
  onCategoryChange,
  onSubcategoryChange,
}: SharedFieldsProps) {
  const { formattedValue, handleMaskChange, rawValue } = useMonetaryMask()

  const [categories, setCategories] = useState<
    { _id: string; description: string }[]
  >([])
  const [subcategories, setSubcategories] = useState<
    { _id: string; description: string }[]
  >([])
  const [selectedCategoryId, setSelectedCategoryId] = useState('')

  const fetchCategories = useCallback(async () => {
    try {
      const data = await apiListFinancialCategories()
      setCategories(data)
    } catch {
      setCategories([])
    }
  }, [])

  const fetchSubcategories = useCallback(async (categoryId: string) => {
    try {
      const data = await apiListSubcategories(categoryId)
      setSubcategories(data)
    } catch {
      setSubcategories([])
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    if (selectedCategoryId) {
      fetchSubcategories(selectedCategoryId)
    } else {
      setSubcategories([])
    }
  }, [selectedCategoryId, fetchSubcategories])

  const handleCategoryChange = useCallback(
    (value: string) => {
      setSelectedCategoryId(value)
      onCategoryChange?.(value)
    },
    [onCategoryChange],
  )

  return (
    <VStack p="$4" gap="$4">
      <Input
        placeholder="Descrição"
        onChangeText={onDescriptionChange}
      />
      <Input
        placeholder="Valor"
        keyboardType="numeric"
        value={formattedValue}
        onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
          handleMaskChange(e)
        }}
        onChangeText={() => {
          onAmountChange?.(rawValue)
        }}
      />
      <DatePicker onDateChange={onDateChange} />
      <CategorySelect
        type="financialCategory"
        options={categories}
        onValueChange={handleCategoryChange}
      />
      <CategorySelect
        type="subcategory"
        options={subcategories}
        onValueChange={onSubcategoryChange}
        disabled={!selectedCategoryId}
        parentCategoryId={selectedCategoryId}
      />
    </VStack>
  )
}
