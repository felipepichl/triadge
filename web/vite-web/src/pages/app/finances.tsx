import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react'

import { Summary, SummaryProps } from '@/components/summary'
import { Transaction } from '@/components/transaction'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const summaries: SummaryProps[] = [
  {
    color: 'default',
    description: 'Entradas',
    icon: ArrowDownCircle,
    iconColor: '#00b37e',
    value: 'R$ 17.000,00',
  },
  {
    color: 'default',
    description: 'Saídas',
    icon: ArrowUpCircle,
    iconColor: '#ff0000',
    value: 'R$ 1.000,00',
  },
  {
    color: 'green',
    description: 'Total',
    icon: DollarSign,
    iconColor: '#fff',
    value: 'R$ 16.000,00',
  },
]

export function Finances() {
  return (
    <>
      <Carousel>
        <CarouselContent>
          {summaries.map((summary) => (
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

      <Transaction />
    </>
  )
}
