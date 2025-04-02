import { CreateStockDTO } from '@/dtos/stock-dto'
import { api } from '@/lib/axios'

import { handleApiError } from '../utils/api-error-handler'

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
