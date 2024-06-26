import {
  ArrowDownCircle,
  ArrowUpCircle,
  DollarSign,
  Search,
} from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { NewTransaction } from '@/components/new-transaction/transaction/new-tranaction'
import { Summary, SummaryProps } from '@/components/summary'
import {
  Transactions,
  TransactionsProps,
} from '@/components/transactions/transactions'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Input } from '@/components/ui/input'
import { useTransaction } from '@/hooks/use-transaction'
import { priceFormatter } from '@/util/formatter'

const transactions: TransactionsProps[] = [
  {
    descrition: 'Desenvolvimento de site',
    value: 'R$ 1.200,00',
    category: 'Venda',
  },
  {
    descrition: 'Update de Servidor',
    value: 'R$ 1.300,00',
    category: 'Venda',
  },
  {
    descrition: 'Update de Servidor II',
    value: 'R$ 1.300,00',
    category: 'Venda',
  },
  {
    descrition: 'Update de Servidor IV',
    value: 'R$ 1.300,00',
    category: 'Venda',
  },
]

export function Finances() {
  const { transactions: getBalance } = useTransaction()
  const [summaries, setSummaries] = useState<SummaryProps[]>()

  useEffect(() => {
    async function loadSummary() {
      const summariesResume: SummaryProps[] = [
        {
          color: 'default',
          description: 'Entradas',
          icon: ArrowDownCircle,
          iconColor: '#00b37e',
          value: priceFormatter.format(
            getBalance ? getBalance.balance.income : 0,
          ),
        },
        {
          color: 'default',
          description: 'Saídas',
          icon: ArrowUpCircle,
          iconColor: '#ff0000',
          value: priceFormatter.format(
            getBalance ? getBalance.balance.outcome : 0,
          ),
        },
        {
          color: 'green',
          description: 'Total',
          icon: DollarSign,
          iconColor: '#fff',
          value: priceFormatter.format(
            getBalance ? getBalance.balance.total : 0,
          ),
        },
      ]

      setSummaries(summariesResume)
    }

    loadSummary()
  }, [getBalance])

  return (
    <>
      <Helmet title="Finanças" />

      <NewTransaction />

      <Carousel>
        <CarouselContent>
          {summaries?.map((summary) => (
            <CarouselItem
              className="md:basis-1/2 lg:basis-1/3"
              key={summary.description}
            >
              <Summary
                description={summary.description}
                color={summary.color}
                icon={summary.icon}
                iconColor={summary.iconColor}
                value={summary.value}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex h-min w-full items-center justify-center lg:hidden">
          <div className="max-w-lg p-4">
            <div className="flex justify-between space-x-16">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </div>
        </div>
      </Carousel>

      <div className="mb-4 flex items-center justify-between gap-2 lg:pt-10">
        <Input placeholder="Buscar uma transação" />
        <Button
          variant="outline"
          className={`
            flex 
            w-10 
            items-center 
            justify-center 
            rounded-sm 
            border-green-500 
            text-green-500 
            hover:border-green-700 
            hover:bg-green-700 
            hover:text-slate-100 md:w-40
          `}
          size="icon"
        >
          <Search className="mr-0 h-4 w-4 md:mr-1 md:h-5 md:w-5" />
          <span className="hidden md:inline">Buscar</span>
        </Button>
      </div>

      <Transactions data={transactions} />
    </>
  )
}
