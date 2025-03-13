import { createContext, ReactNode, useCallback } from 'react'

import { apiCreateStock } from '@/api/app/stock/create-stock'
import { CreateStockDTO } from '@/dtos/stock'

type StockContextData = {
  createStock(data: CreateStockDTO): Promise<void>
}

type StockProvidersProps = {
  children: ReactNode
}

const StockContext = createContext({} as StockContextData)

function StockProvider({ children }: StockProvidersProps) {
  const createStock = useCallback(
    async ({ symbol, price, date, quantity, type }: CreateStockDTO) => {
      await apiCreateStock({ symbol, price, date, quantity, type })
    },
    [],
  )

  return (
    <StockContext.Provider value={{ createStock }}>
      {children}
    </StockContext.Provider>
  )
}

export type { StockContextData }
export { StockContext, StockProvider }
