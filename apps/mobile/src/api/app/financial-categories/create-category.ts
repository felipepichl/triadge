import { CreateFinancialCategoryDTO } from '@umabel/core'

import { handleApiError } from '@/api/api-error-handler'
import { api } from '@/lib/axios'

export async function apiCreateFinancialCategory({
  description,
}: CreateFinancialCategoryDTO): Promise<void> {
  try {
    await api.post('/financial-category', { description })
  } catch (error) {
    throw handleApiError(error)
  }
}
