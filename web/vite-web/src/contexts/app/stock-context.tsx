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
import { useAuth } from '@/hooks/use-auth'

type StockContextData = {
  createStock(data: CreateStockDTO): Promise<void>
  getPortfolioQuotes(type: string): Promise<void>
  portfolio: PortfolioResponseDTO | undefined
  investment: InvestementResponseDTO | undefined
  buyStock(data: BuyStockDTO): Promise<void>
  sellStock(data: SellStockDTO): Promise<void>
  isLoadingPortfolio: boolean
}

type StockProvidersProps = {
  children: ReactNode
}

const StockContext = createContext({} as StockContextData)

function StockProvider({ children }: StockProvidersProps) {
  const { isAuthenticated } = useAuth()
  const [portfolio, setPortfolio] = useState<PortfolioResponseDTO>()
  const [investment, setInvestment] = useState<InvestementResponseDTO>()
  const [reload, setReload] = useState(false)
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(false)

  const createStock = useCallback(
    async ({ symbol, price, date, quantity, type }: CreateStockDTO) => {
      await apiCreateStock({ symbol, price, date, quantity, type })

      setReload((prev) => !prev)
    },
    [],
  )

  const getPortfolioQuotes = useCallback(async (type: string) => {
    if (!isAuthenticated) {
      setIsLoadingPortfolio(false)
      return
    }

    setIsLoadingPortfolio(true)
    try {
      const portfolio = await apiGetPortfolioQuotes(type)
      setPortfolio(portfolio)
    } catch (error) {
      console.error('Error fetching portfolio:', error)
      setPortfolio(undefined)
    } finally {
      setIsLoadingPortfolio(false)
    }
  }, [isAuthenticated])

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

      setReload((prev) => !prev)
    },
    [],
  )

  const sellStock = useCallback(
    async ({ symbol, price, date, quantity }: SellStockDTO) => {
      await apiSellStock({ symbol, price, date, quantity })

      setReload((prev) => !prev)
    },
    [],
  )

  useEffect(() => {
    getTotalInvestedAndCurrentQuote()
  }, [getTotalInvestedAndCurrentQuote, reload])

  useEffect(() => {
    if (reload && isAuthenticated) {
      // Reload portfolio when reload changes and user is authenticated
      getPortfolioQuotes('fii')
    }
  }, [getPortfolioQuotes, reload, isAuthenticated])

  return (
    <StockContext.Provider
      value={{
        createStock,
        getPortfolioQuotes,
        portfolio,
        investment,
        buyStock,
        sellStock,
        isLoadingPortfolio,
      }}
    >
      {children}
    </StockContext.Provider>
  )
}

export type { StockContextData }
export { StockContext, StockProvider }
