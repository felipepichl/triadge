import { useCallback, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

import { NewStock } from '@/components/new-stock/new-stock'
import { useStock } from '@/hooks/use-stock'

export function Stock() {
  const { getPortfolioQuotes } = useStock()

  const portfolioQuotes = useCallback(async () => {
    await getPortfolioQuotes('fii')
  }, [getPortfolioQuotes])

  useEffect(() => {
    portfolioQuotes()
  }, [portfolioQuotes])

  return (
    <>
      <Helmet title="Ações e FIIs" />
      <NewStock />
    </>
  )
}
