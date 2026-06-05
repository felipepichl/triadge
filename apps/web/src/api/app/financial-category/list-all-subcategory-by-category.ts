import { SubcategoryDetailDTO, SubcategoryResponseDTO } from '@umabel/core'

import { api } from '@/lib/axios'
import { handleApiError } from '../utils/api-error-handler'

export type SubcategoryBody = {
  parentCategoryId: string
}

export async function apiListAllSubcategoryByCategory({
  parentCategoryId,
}: SubcategoryBody): Promise<SubcategoryDetailDTO[]> {
  try {
    const { data } = await api.get<{
      subcategories: SubcategoryResponseDTO[]
    }>(`/financial-category/subcategory/${parentCategoryId}`)

    return data.subcategories
  } catch (error) {
    throw handleApiError(error)
  }
}
