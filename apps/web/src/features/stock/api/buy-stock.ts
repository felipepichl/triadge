import { BuyStockDTO } from '@umabel/core'

import { handleApiError } from '@/shared/api/api-error-handler'
import { api } from '@/shared/lib/axios'

export async function apiBuyStock({
  symbol,
  price,
  date,
  quantity,
  type,
}: BuyStockDTO): Promise<void> {
  try {
    await api.post('/stocks/buy', {
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
