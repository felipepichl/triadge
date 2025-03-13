import { CreateStockDTO } from '@/dtos/stock'
import { api } from '@/lib/axios'

export async function apiCreateStock({
  symbol,
  price,
  date,
  quantity,
  type,
}: CreateStockDTO): Promise<void> {
  await api.post('/stocks', {
    symbol,
    price,
    date,
    quantity,
    type,
  })
}
