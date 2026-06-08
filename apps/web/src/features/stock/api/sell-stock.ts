import { SellStockDTO } from '@umabel/core'

import { handleApiError } from '@/shared/api/api-error-handler'
import { api } from '@/shared/lib/axios'

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
