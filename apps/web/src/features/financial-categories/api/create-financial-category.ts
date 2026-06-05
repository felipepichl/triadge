import { CreateFinancialCategoryDTO } from '@umabel/core'

import { api } from '@/shared/lib/axios'
import { handleApiError } from '@/shared/api/api-error-handler'

export async function apiCreateFinancialCategory({
  description,
}: CreateFinancialCategoryDTO): Promise<void> {
  try {
    await api.post('/financial-category', { description })
  } catch (error) {
    throw handleApiError(error)
  }
}
