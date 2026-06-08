import { SubcategoryDetailDTO, SubcategoryResponseDTO } from '@umabel/core'

import { handleApiError } from '@/api/api-error-handler'
import { api } from '@/lib/axios'

export async function apiListSubcategories(
  parentCategoryId: string,
): Promise<SubcategoryDetailDTO[]> {
  try {
    const { data } = await api.get<{
      subcategories: SubcategoryResponseDTO[]
    }>(`/financial-category/subcategory/${parentCategoryId}`)

    return data.subcategories
  } catch (error) {
    throw handleApiError(error)
  }
}
