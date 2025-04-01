import { createContext, ReactNode, useCallback } from 'react'

import { apiCreateStock } from '@/api/app/stock/create-stock'
import { apiGetPortfolioQuotes } from '@/api/app/stock/get-portfolio-quotes'
import { CreateStockDTO } from '@/dtos/stock'

type StockContextData = {
  createStock(data: CreateStockDTO): Promise<void>
  getPortfolioQuotes(type: string): Promise<void>
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

  const getPortfolioQuotes = useCallback(async (type: string) => {
    await apiGetPortfolioQuotes(type)
  }, [])

  return (
    <StockContext.Provider value={{ createStock, getPortfolioQuotes }}>
      {children}
    </StockContext.Provider>
  )
}

export type { StockContextData }
export { StockContext, StockProvider }
