import { Calendar, Tag } from 'lucide-react'

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
import { TransactionsData } from './transactions'

export function CardTransactions({ data }: TransactionsData) {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      orientation="vertical"
      className="w-full"
    >
      <CarouselContent className="-mt-1 h-[180px]">
        {data.map((transaction) => (
          <CarouselItem
            key={transaction.descrition}
            className="pt-1 md:basis-1/2"
          >
            <Card className=" mb-2 bg-gray-300 dark:bg-gray-700">
              <CardHeader>
                <CardDescription className="font-semibold text-gray-500 dark:text-slate-200">
                  {transaction.descrition}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CardTitle className="font-bold text-green-500">
                  {transaction.value}
                </CardTitle>
              </CardContent>

              <CardFooter className="flex items-center justify-between px-6 pb-6">
                <div className="flex items-center">
                  <Tag
                    size={16}
                    className="mr-2 text-gray-500 dark:text-gray-400"
                  />
                  <span className="font-semibold text-gray-500 dark:text-gray-400">
                    {transaction.category}
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
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
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
