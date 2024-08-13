import { addMonths, format, startOfMonth } from 'date-fns'
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar as CalendarIcon,
  DollarSign,
  Search,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { Helmet } from 'react-helmet-async'

import { NewTransaction } from '@/components/new-transaction/transaction/new-tranaction'
import { Summary, SummaryProps } from '@/components/summary'
import { Transactions } from '@/components/transactions/transactions'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTransaction } from '@/hooks/use-transaction'
import { priceFormatter } from '@/util/formatter'

export function Finances() {
  const {
    transactions,
    transactionByDateRangeAndType,
    loadTransactionByDateRangeAndType,
  } = useTransaction()

  const [summaries, setSummaries] = useState<SummaryProps[]>()
  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined,
  )

  const today = new Date()
  const firstDayOfMonth = startOfMonth(today)
  const firstDayOfNextMonth = startOfMonth(addMonths(today, 1))

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: firstDayOfMonth,
    to: firstDayOfNextMonth,
  })

  useEffect(() => {
    if (date?.from && date?.to) {
      loadTransactionByDateRangeAndType(
        date.from,
        date.to,
        selectedType as 'income' | 'outcome',
      )
    }
  }, [date, loadTransactionByDateRangeAndType, selectedType])

  useEffect(() => {
    if (!transactionByDateRangeAndType) return

    const summariesResume: SummaryProps[] = [
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

    setSummaries(summariesResume)
  }, [transactionByDateRangeAndType, transactions])

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
                totalAmount={summary.totalAmount}
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
                    <span>Pick a date</span>
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
                setSelectedType(value === 'all' ? undefined : value)
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

        <div className="flex w-full gap-2 lg:flex-1">
          <Input placeholder="Buscar uma transação" className="flex-grow" />
          <Button
            variant="outline"
            className="flex w-10 items-center justify-center rounded-sm border-green-500 text-green-500 hover:border-green-700 hover:bg-green-700 hover:text-slate-100 md:w-40"
            size="icon"
          >
            <Search className="mr-0 h-4 w-4 md:mr-1 md:h-5 md:w-5" />
            <span className="hidden md:inline">Buscar</span>
          </Button>
        </div>
      </div>

      <Transactions
        transactions={transactionByDateRangeAndType?.transactions ?? []}
      />
    </>
  )
}
