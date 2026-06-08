import {
  FinancialCategoryDetailDTO,
  FinancialCategoryResponseDTO,
} from '@umabel/core'

import { handleApiError } from '@/api/api-error-handler'
import { api } from '@/lib/axios'

export async function apiListFinancialCategories(): Promise<
  FinancialCategoryDetailDTO[]
> {
  try {
    const { data } = await api.get<{
      financialCategories: FinancialCategoryResponseDTO[]
    }>('/financial-category')

    return data.financialCategories
  } catch (error) {
    throw handleApiError(error)
  }
}
