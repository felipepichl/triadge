import { CreateFinancialCategoryDTO } from '@umabel/core'

import { handleApiError } from '@/shared/api/api-error-handler'
import { api } from '@/shared/lib/axios'

export async function apiCreateFinancialCategory({
  description,
}: CreateFinancialCategoryDTO): Promise<void> {
  try {
    await api.post('/financial-category', { description })
  } catch (error) {
    throw handleApiError(error)
  }
}
