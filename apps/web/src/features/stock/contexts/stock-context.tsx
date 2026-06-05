import {
  BuyStockDTO,
  CreateStockDTO,
  InvestementResponseDTO,
  PortfolioResponseDTO,
  SellStockDTO,
} from '@umabel/core'
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { apiBuyStock } from '@/features/stock/api/buy-stock'
import { apiCreateStock } from '@/features/stock/api/create-stock'
import { apiGetPortfolioQuotes } from '@/features/stock/api/get-portfolio-quotes'
import { apiGetTotalInvestedAndCurrentQuote } from '@/features/stock/api/get-total-invested-and-current-quote'
import { apiSellStock } from '@/features/stock/api/sell-stock'
import { useAuth } from '@/features/auth/hooks/use-auth'

type StockContextData = {
  createStock(data: CreateStockDTO): Promise<void>
  getPortfolioQuotes(type: string): Promise<void>
  portfolio: PortfolioResponseDTO | undefined
  investment: InvestementResponseDTO | undefined
  buyStock(data: BuyStockDTO): Promise<void>
  sellStock(data: SellStockDTO): Promise<void>
  isLoadingPortfolio: boolean
  isLoadingInvestment: boolean
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
  const [isLoadingInvestment, setIsLoadingInvestment] = useState(false)

  const createStock = useCallback(
    async ({ symbol, price, date, quantity, type }: CreateStockDTO) => {
      await apiCreateStock({ symbol, price, date, quantity, type })

      setReload((prev) => !prev)
    },
    [],
  )

  const getPortfolioQuotes = useCallback(
    async (type: string) => {
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
    },
    [isAuthenticated],
  )

  const getTotalInvestedAndCurrentQuote = useCallback(
    async (type?: string) => {
      if (!isAuthenticated) {
        setIsLoadingInvestment(false)
        return
      }

      if (!type) {
        type = 'fii'
      }

      setIsLoadingInvestment(true)
      try {
        const investiment = await apiGetTotalInvestedAndCurrentQuote(type)
        setInvestment(investiment)
      } catch (error) {
        console.error('Error fetching investment:', error)
        setInvestment(undefined)
      } finally {
        setIsLoadingInvestment(false)
      }
    },
    [isAuthenticated],
  )

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
        isLoadingInvestment,
      }}
    >
      {children}
    </StockContext.Provider>
  )
}

export type { StockContextData }
export { StockContext, StockProvider }
