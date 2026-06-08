import {
  FinancialCategoryDetailDTO,
  FinancialCategoryResponseDTO,
} from '@umabel/core'

import { handleApiError } from '@/shared/api/api-error-handler'
import { api } from '@/shared/lib/axios'

export async function apiListAllFinancialCategoryByUser(): Promise<
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
