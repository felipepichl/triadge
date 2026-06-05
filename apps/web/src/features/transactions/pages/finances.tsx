import { addMonths, format, startOfMonth } from 'date-fns'
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar as CalendarIcon,
  DollarSign,
} from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { Helmet } from 'react-helmet-async'

import { NewTransactionAccount } from '@/features/transactions/components/new-transaction-account/new-transaction-account'
import { SummaryProps } from '@/shared/components/summary/summary'
import { SummaryCarousel } from '@/shared/components/summary/summary-carousel'
import { Transactions } from '@/features/transactions/components/transactions'
import { Button } from '@/shared/components/ui/button'
import { Calendar } from '@/shared/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { useTransactions } from '@/features/transactions/hooks/use-transactions'
import { useTransactionsByDateRange } from '@/features/transactions/hooks/use-transactions-by-date-range'
import { priceFormatter } from '@/shared/util/formatter'

export function Finances() {
  const today = new Date()
  const firstDayOfMonth = startOfMonth(today)
  const firstDayOfNextMonth = startOfMonth(addMonths(today, 1))

  const [selectedType, setSelectedType] = useState<
    'income' | 'outcome' | undefined
  >(undefined)

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: firstDayOfMonth,
    to: firstDayOfNextMonth,
  })

  const { data: transactions } = useTransactions()
  const { data: transactionByDateRangeAndType } = useTransactionsByDateRange(
    date?.from,
    date?.to,
    selectedType,
  )

  const summaries = useMemo<SummaryProps[]>(() => {
    if (!transactionByDateRangeAndType) return []

    return [
      {
        color: 'default',
        description: 'Entradas',
        icon: ArrowDownCircle,
        iconColor: '#00b37e',
        value: priceFormatter.format(
          transactionByDateRangeAndType.balance?.income ?? 0,
        ),
      },
      {
        color: 'default',
        description: 'Saídas',
        icon: ArrowUpCircle,
        iconColor: '#ff0000',
        value: priceFormatter.format(
          transactionByDateRangeAndType.balance?.outcome ?? 0,
        ),
      },
      {
        color: 'green',
        description: 'Total',
        icon: DollarSign,
        iconColor: '#fff',
        value: priceFormatter.format(
          transactionByDateRangeAndType.balance?.total ?? 0,
        ),
        totalAmount: priceFormatter.format(transactions?.balance?.total ?? 0),
      },
    ]
  }, [transactionByDateRangeAndType, transactions])

  return (
    <>
      <Helmet title="Finanças" />

      <NewTransactionAccount title="Nova Transação" type="transaction" />

      <SummaryCarousel summaries={summaries} />

      <div className="mb-4 flex flex-col items-center justify-between gap-2 lg:flex-row lg:pt-10">
        <div className="flex w-full flex-col gap-2 lg:w-auto lg:flex-1 lg:flex-row">
          <div className="w-full min-w-0 lg:flex-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd, y')} -{' '}
                        {format(date.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-full min-w-0 lg:flex-1">
            <Select
              onValueChange={(value) =>
                setSelectedType(
                  value === 'all'
                    ? undefined
                    : (value as 'income' | 'outcome'),
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filtro por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="income">Entrada</SelectItem>
                  <SelectItem value="outcome">Saída</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

      </div>

      <Transactions
        transactions={transactionByDateRangeAndType?.transactions ?? []}
      />
    </>
  )
}
