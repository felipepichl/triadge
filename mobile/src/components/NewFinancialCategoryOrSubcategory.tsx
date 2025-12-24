import { RouteProp, useRoute } from '@react-navigation/native'
import { StackRoutes } from '@routes/app/stack.routes'

import { StackHeader } from './Headers/StackHeader'

type NewFinancialCategoryOrSubcategoryProps = RouteProp<
  StackRoutes,
  'newFinancialCategoryOrSubcategory'
>

export function NewFinancialCategoryOrSubcategory() {
  const route = useRoute<NewFinancialCategoryOrSubcategoryProps>()
  const { type, parentCategoryId } = route.params

  console.log(parentCategoryId)

  return (
    <StackHeader
      title={
        type === 'financialCategory' ? 'Nova Categoria' : 'Nova Subcategoria'
      }
    />
  )
}
