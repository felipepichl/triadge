import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { apiCreateStock } from '@/api/app/stock/create-stock'
import { apiGetPortfolioQuotes } from '@/api/app/stock/get-portfolio-quotes'
import { apiGetTotalInvestedAndCurrentQuote } from '@/api/app/stock/get-total-invested-and-current-quote'
import {
  CreateStockDTO,
  InvestementResponseDTO,
  PortfolioResponseDTO,
} from '@/dtos/stock-dto'

type StockContextData = {
  createStock(data: CreateStockDTO): Promise<void>
  getPortfolioQuotes(type: string): Promise<void>
  portfolio: PortfolioResponseDTO | undefined
  investment: InvestementResponseDTO | undefined
}

type StockProvidersProps = {
  children: ReactNode
}

const StockContext = createContext({} as StockContextData)

function StockProvider({ children }: StockProvidersProps) {
  const [portfolio, setPortfolio] = useState<PortfolioResponseDTO>()
  const [investment, setInvestment] = useState<InvestementResponseDTO>()

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

  const getTotalInvestedAndCurrentQuote = useCallback(async (type?: string) => {
    if (!type) {
      type = 'fii'
    }

    const investiment = await apiGetTotalInvestedAndCurrentQuote(type)

    setInvestment(investiment)
  }, [])

  useEffect(() => {
    getTotalInvestedAndCurrentQuote()
  }, [getTotalInvestedAndCurrentQuote])

  return (
    <StockContext.Provider
      value={{ createStock, getPortfolioQuotes, portfolio, investment }}
    >
      {children}
    </StockContext.Provider>
  )
}

export type { StockContextData }
export { StockContext, StockProvider }
