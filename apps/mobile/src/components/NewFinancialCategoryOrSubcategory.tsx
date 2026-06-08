import { Input } from '@components/GenericFormAndFileds/Fileds/Input'
import { VStack } from '@components/ui/vstack'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigatorRoutesProps, StackRoutes } from '@routes/app/stack.routes'
import { useCallback, useState } from 'react'

import { apiCreateFinancialCategory } from '@/api/app/financial-categories/create-category'
import { apiCreateSubcategory } from '@/api/app/financial-categories/create-subcategory'
import { toast } from '@/utils/toast'

import { Button } from './Button'
import { StackHeader } from './Headers/StackHeader'

type NewFinancialCategoryOrSubcategoryProps = RouteProp<
  StackRoutes,
  'newFinancialCategoryOrSubcategory'
>

export function NewFinancialCategoryOrSubcategory() {
  const route = useRoute<NewFinancialCategoryOrSubcategoryProps>()
  const navigator = useNavigation<StackNavigatorRoutesProps>()
  const { type, parentCategoryId } = route.params

  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isCategory = type === 'financialCategory'

  const handleSubmit = useCallback(async () => {
    if (!description.trim()) {
      toast.error('Informe uma descrição')
      return
    }

    setIsLoading(true)
    try {
      if (isCategory) {
        await apiCreateFinancialCategory({ description })
      } else {
        await apiCreateSubcategory({
          description,
          parentCategoryId: parentCategoryId!,
        })
      }

      toast.success(
        isCategory
          ? 'Categoria criada com sucesso!'
          : 'Subcategoria criada com sucesso!',
      )
      navigator.goBack()
    } catch {
      toast.error('Erro ao salvar, tente novamente mais tarde!')
    } finally {
      setIsLoading(false)
    }
  }, [description, isCategory, parentCategoryId, navigator])

  return (
    <VStack flex={1}>
      <StackHeader
        title={isCategory ? 'Nova Categoria' : 'Nova Subcategoria'}
      />

      <VStack p="$4" gap="$4">
        <Input
          placeholder="Descrição"
          onChangeText={setDescription}
          value={description}
        />
        <Button
          title="Cadastrar"
          type="default"
          onPress={handleSubmit}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  )
}
