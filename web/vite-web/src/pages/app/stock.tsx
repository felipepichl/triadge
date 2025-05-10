import { Activity, DollarSign, TrendingUpDown } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { ListStock } from '@/components/list-stock'
import { NewStock } from '@/components/new-stock/new-stock'
import { SummaryProps } from '@/components/summary/summary'
import { SummaryCarousel } from '@/components/summary/summary-carousel'
import { useStock } from '@/hooks/use-stock'
import { priceFormatter } from '@/util/formatter'

export function Stock() {
  const [summaries, setSummaries] = useState<SummaryProps[]>([])

  const { getPortfolioQuotes, investment } = useStock()

  const portfolioQuotes = useCallback(async () => {
    await getPortfolioQuotes('fii')
  }, [getPortfolioQuotes])

  useEffect(() => {
    portfolioQuotes()
  }, [portfolioQuotes])

  useEffect(() => {
    const summariesResume: SummaryProps[] = [
      {
        color: 'default',
        description: 'Total Investido',
        icon: DollarSign,
        iconColor: '#00b37e',
        value: priceFormatter.format(investment?.totalInvested ?? 0),
      },
      {
        color: 'default',
        description: 'Cotação Atual',
        icon: Activity,
        iconColor: '#ff0000',
        value: priceFormatter.format(investment?.currentValue ?? 0),
      },
      {
        color: 'green',
        description: 'Posição',
        icon: TrendingUpDown,
        iconColor: '#fff',
        value: 'R$ 250,00',
      },
    ]

    setSummaries(summariesResume)
  }, [investment])

  return (
    <>
      <Helmet title="Ações e FIIs" />
      <NewStock />

      <SummaryCarousel summaries={summaries} />

      <div className="mt-8 flex flex-col lg:flex-row">
        <ListStock type="fii" />
      </div>
    </>
  )
}
