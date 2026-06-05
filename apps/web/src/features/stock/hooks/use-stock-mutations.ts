import { BuyStockDTO, SellStockDTO } from '@umabel/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiBuyStock } from '@/features/stock/api/buy-stock'
import { apiSellStock } from '@/features/stock/api/sell-stock'

export function useBuyStock() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: BuyStockDTO) => apiBuyStock(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock'] })
    },
  })
}

export function useSellStock() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: SellStockDTO) => apiSellStock(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock'] })
    },
  })
}
