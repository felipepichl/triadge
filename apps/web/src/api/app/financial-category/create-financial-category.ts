import { CreateFinancialCategoryDTO } from '@umabel/core'

import { api } from '@/lib/axios'
import { handleApiError } from '../utils/api-error-handler'

export async function apiCreateFinancialCategory({
  description,
}: CreateFinancialCategoryDTO): Promise<void> {
  try {
    await api.post('/financial-category', { description })
  } catch (error) {
    throw handleApiError(error)
  }
}
