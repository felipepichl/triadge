import { CreateSubcategoryDTO } from '@umabel/core'

import { handleApiError } from '@/api/api-error-handler'
import { api } from '@/lib/axios'

export async function apiCreateSubcategory({
  description,
  parentCategoryId,
}: CreateSubcategoryDTO): Promise<void> {
  try {
    await api.post('/financial-category/subcategory', {
      description,
      parentCategoryId,
    })
  } catch (error) {
    throw handleApiError(error)
  }
}
