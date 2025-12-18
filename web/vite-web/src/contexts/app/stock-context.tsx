import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { apiBuyStock } from '@/api/app/stock/buy-stock'
import { apiCreateStock } from '@/api/app/stock/create-stock'
import { apiGetPortfolioQuotes } from '@/api/app/stock/get-portfolio-quotes'
import { apiGetTotalInvestedAndCurrentQuote } from '@/api/app/stock/get-total-invested-and-current-quote'
import { apiSellStock } from '@/api/app/stock/sell-stock'
import {
  BuyStockDTO,
  CreateStockDTO,
  InvestementResponseDTO,
  PortfolioResponseDTO,
  SellStockDTO,
} from '@/dtos/stock-dto'

type StockContextData = {
  createStock(data: CreateStockDTO): Promise<void>
  getPortfolioQuotes(type: string): Promise<void>
  portfolio: PortfolioResponseDTO | undefined
  investment: InvestementResponseDTO | undefined
  buyStock(data: BuyStockDTO): Promise<void>
  sellStock(data: SellStockDTO): Promise<void>
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

  const buyStock = useCallback(
    async ({ symbol, price, date, quantity, type }: BuyStockDTO) => {
      await apiBuyStock({ symbol, price, date, quantity, type })
    },
    [],
  )

  const sellStock = useCallback(
    async ({ symbol, price, date, quantity }: SellStockDTO) => {
      await apiSellStock({ symbol, price, date, quantity })
    },
    [],
  )

  useEffect(() => {
    getTotalInvestedAndCurrentQuote()
  }, [getTotalInvestedAndCurrentQuote])

  return (
    <StockContext.Provider
      value={{
        createStock,
        getPortfolioQuotes,
        portfolio,
        investment,
        buyStock,
        sellStock,
      }}
    >
      {children}
    </StockContext.Provider>
  )
}

export type { StockContextData }
export { StockContext, StockProvider }
