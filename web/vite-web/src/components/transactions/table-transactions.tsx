import { ArrowRightCircle, Calendar, Tag } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { ScrollArea } from '../ui/scroll-area'
import { Table, TableBody, TableHead, TableRow } from '../ui/table'

export type TableTransactionsProps = {
  descrition: string
  value: string
  category: string
}

type TableTransactionsData = {
  data: TableTransactionsProps[]
}

export function TableTransactions({ data }: TableTransactionsData) {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      {isWideScreen ? (
        <Table className="mt-11 hidden md:table md:basis-1/2">
          <TableBody>
            {data.map((transaction) => (
              <TableRow key={transaction.descrition}>
                <TableHead>{transaction.descrition}</TableHead>
                <TableHead>{transaction.value}</TableHead>
                <TableHead>{transaction.category}</TableHead>
                <TableHead className="text-right">13/03/2025</TableHead>
                <TableHead className="flex items-center justify-center">
                  <Link to="/finance/details">
                    <ArrowRightCircle />
                  </Link>
                </TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <ScrollArea className="h-96">
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
      )}
    </>
  )
}
