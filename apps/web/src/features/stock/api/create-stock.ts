import { CreateStockDTO } from '@umabel/core'

import { handleApiError } from '@/shared/api/api-error-handler'
import { api } from '@/shared/lib/axios'

export async function apiCreateStock({
  symbol,
  price,
  date,
  quantity,
  type,
}: CreateStockDTO): Promise<void> {
  try {
    await api.post('/stocks', {
      symbol,
      price,
      date,
      quantity,
      type,
    })
  } catch (error) {
    throw handleApiError(error)
  }
}
