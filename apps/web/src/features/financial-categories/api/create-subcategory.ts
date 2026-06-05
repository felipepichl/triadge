import { CreateSubcategoryDTO } from '@umabel/core'

import { api } from '@/shared/lib/axios'
import { handleApiError } from '@/shared/api/api-error-handler'

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
