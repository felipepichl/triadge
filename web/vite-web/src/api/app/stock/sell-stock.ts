import { SellStockDTO } from '@/dtos/stock-dto'
import { api } from '@/lib/axios'

import { handleApiError } from '../utils/api-error-handler'

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
