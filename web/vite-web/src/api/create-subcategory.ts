import { api } from '@/lib/axios'

export type CreateFinancialCategoryBody = {
  description: string
  parentCategoryId: string
}

export async function apiCreateSubcategory({
  description,
  parentCategoryId,
}: CreateFinancialCategoryBody): Promise<void> {
  const response = await api.post(
    `/financial-category/subcategory/${parentCategoryId}`,
    {
      description,
    },
  )

  return response.data
}
