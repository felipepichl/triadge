import { format } from 'date-fns'
import { Calendar, Tag } from 'lucide-react'

import { Transaction } from '@/api/list-all-transaction'
import { priceFormatter } from '@/util/formatter'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'

export function CardTransactions({ transactions }: Transaction) {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      orientation="vertical"
      className="w-full"
    >
      <CarouselContent className="-mt-1 h-[180px]">
        {transactions.map((transaction) => {
          const formattedDate = format(new Date(transaction.date), 'dd/MM/yyyy')
          return (
            <CarouselItem key={transaction._id} className="pt-1 md:basis-1/2">
              <Card className=" mb-2 bg-gray-300 dark:bg-gray-700">
                <CardHeader>
                  <CardDescription className="font-semibold text-gray-500 dark:text-slate-200">
                    {transaction.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CardTitle
                    className={`font-bold ${transaction.type === 'outcome' ? 'text-red-500' : 'text-green-500'}`}
                  >
                    {priceFormatter.format(transaction.value)}
                  </CardTitle>
                </CardContent>

                {/* <CardFooter className="flex items-center justify-between px-6 pb-6">
                <div className="flex items-center">
                  <Tag
                    size={16}
                    className="mr-2 text-gray-500 dark:text-gray-400"
                  />
                  <span className="font-semibold text-gray-500 dark:text-gray-400">
                    {transaction.transactionCategory.description}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar
                    size={16}
                    className="mr-2 text-gray-500 dark:text-gray-400"
                  />
                  <span className=" font-semibold text-gray-500 dark:text-gray-400">
                    13/03/2025
                  </span>
                </div>
              </CardFooter> */}

                <CardFooter className="flex items-center justify-between gap-4 px-6 pb-6">
                  <div className="flex items-center overflow-hidden">
                    <Tag
                      size={16}
                      className="mr-2 flex-shrink-0 text-gray-500 dark:text-gray-400"
                    />
                    <span className="truncate font-semibold text-gray-500 dark:text-gray-400">
                      {transaction.financialCategory.description}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar
                      size={16}
                      className="mr-2 text-gray-500 dark:text-gray-400"
                    />
                    <span className="font-semibold text-gray-500 dark:text-gray-400">
                      {formattedDate}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <div className="flex h-min w-full items-center justify-center lg:hidden">
        <div className="max-w-lg p-4">
          <div className="flex justify-between space-x-16">
            <CarouselPrevious className="rotate-90" />
            <CarouselNext className="rotate-90" />
          </div>
        </div>
      </div>
    </Carousel>
  )
}
