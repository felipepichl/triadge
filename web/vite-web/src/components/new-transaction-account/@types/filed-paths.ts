import { Path } from 'react-hook-form'

export const getFieldPaths = <T>() => ({
  description: 'description' as Path<T>,
  amount: 'amount' as Path<T>,
  date: 'date' as Path<T>,
  type: 'type' as Path<T>,
  installments: 'installments' as Path<T>,
  financialCategoryId: 'financialCategoryId' as Path<T>,
  subcategoryId: 'subcategoryId' as Path<T>,
})
