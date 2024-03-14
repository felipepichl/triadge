import { Calendar, Tag } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { ScrollArea } from '../ui/scroll-area'
import { TransactionsData } from './transactions'

export function CardTransactions({ data }: TransactionsData) {
  return (
    <ScrollArea className="h-96 pb-16">
      {data.map((transaction) => (
        <Card
          key={transaction.descrition}
          className=" mb-2 bg-gray-300 dark:bg-gray-700"
        >
          {/* <Card
                key={transaction.descrition}
                className="
                  mb-2 
                bg-gray-300 
                dark:bg-gray-700 
                  md:hidden
                  md:basis-1/2
                "
              > */}

          <CardHeader>
            <CardDescription
              className="
                  font-semibold
                text-gray-500 
                dark:text-slate-200 
                "
            >
              {transaction.descrition}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardTitle className="font-bold text-green-500">
              {transaction.value}
            </CardTitle>
          </CardContent>

          <CardFooter
            className="
                flex 
                items-center 
                justify-between 
                px-6 
                pb-6
              "
          >
            <div className="flex items-center">
              <Tag
                size={16}
                className="mr-2 text-gray-500 dark:text-gray-400"
              />
              <span
                className="
                    font-semibold
                  text-gray-500 
                  dark:text-gray-400
                  "
              >
                {transaction.category}
              </span>
            </div>
            <div className="flex items-center">
              <Calendar
                size={16}
                className="
                    mr-2 
                  text-gray-500 
                  dark:text-gray-400
                  "
              />
              <span
                className="
                    font-semibold 
                  text-gray-500 
                  dark:text-gray-400"
              >
                13/03/2025
              </span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </ScrollArea>
  )
}
