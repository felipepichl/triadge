import {
  FinancialCategoryDetailDTO,
  FinancialCategoryResponseDTO,
} from '@umabel/core'

import { api } from '@/lib/axios'
import { handleApiError } from '../utils/api-error-handler'

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
