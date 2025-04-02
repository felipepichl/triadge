import { createContext, ReactNode, useCallback, useState } from 'react'

import { apiCreateStock } from '@/api/app/stock/create-stock'
import { apiGetPortfolioQuotes } from '@/api/app/stock/get-portfolio-quotes'
import { CreateStockDTO, PortfolioResponseDTO } from '@/dtos/stock-dto'

type StockContextData = {
  createStock(data: CreateStockDTO): Promise<void>
  getPortfolioQuotes(type: string): Promise<void>
  portfolio: PortfolioResponseDTO | undefined
}

type StockProvidersProps = {
  children: ReactNode
}

const StockContext = createContext({} as StockContextData)

function StockProvider({ children }: StockProvidersProps) {
  const [portfolio, setPortfolio] = useState<PortfolioResponseDTO>()

  const createStock = useCallback(
    async ({ symbol, price, date, quantity, type }: CreateStockDTO) => {
      await apiCreateStock({ symbol, price, date, quantity, type })
    },
    [],
  )

  const getPortfolioQuotes = useCallback(async (type: string) => {
    const portfolio = await apiGetPortfolioQuotes(type)

    setPortfolio(portfolio)
  }, [])

  return (
    <StockContext.Provider
      value={{ createStock, getPortfolioQuotes, portfolio }}
    >
      {children}
    </StockContext.Provider>
  )
}

export type { StockContextData }
export { StockContext, StockProvider }
