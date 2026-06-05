import { SellStockDTO } from '@umabel/core'

import { api } from '@/shared/lib/axios'
import { handleApiError } from '@/shared/api/api-error-handler'

export async function apiSellStock({
  symbol,
  price,
  date,
  quantity,
}: SellStockDTO): Promise<void> {
  try {
    await api.post('/stocks/sell', {
      symbol,
      price,
      date,
      quantity,
    })
  } catch (error) {
    throw handleApiError(error)
  }
}
