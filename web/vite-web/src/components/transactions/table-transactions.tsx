import { format } from 'date-fns'
import { ArrowRightCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

// import { TransactionsData } from './transactions'
import { Transaction } from '@/api/list-all-transaction'
import { priceFormatter } from '@/util/formatter'

import { Pagination } from '../pagination'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Table, TableBody, TableHead, TableRow } from '../ui/table'

export function TableTransactions({ transactions: data }: Transaction) {
  return (
    <>
      {/* <Table className="mt-8 hidden md:table md:basis-1/2"></Table> */}
      <Table className="mt-8">
        <TableBody>
          <ScrollArea className="h-72">
            {data.map((transaction) => {
              const rowClass =
                transaction.type === 'outcome' ? 'text-red-500' : ''
              const formattedDate = format(
                new Date(transaction.date),
                'dd/MM/yyyy',
              )
              return (
                <TableRow key={transaction._id}>
                  <TableHead className={`${rowClass} w-7/12`}>
                    {transaction.description}
                  </TableHead>
                  <TableHead className={`${rowClass} w-1/6`}>
                    {priceFormatter.format(transaction.value)}
                  </TableHead>
                  <TableHead className={`${rowClass} w-1/6 `}>
                    {transaction.financialCategory.description}
                  </TableHead>
                  <TableHead className={`${rowClass} `}>
                    {formattedDate}
                  </TableHead>
                  {/* <TableHead className="flex items-center justify-center text-right"></TableHead> */}
                  <TableHead className="w-1/5">
                    <span className="flex items-center justify-center">
                      <Link to="/finance/details">
                        <ArrowRightCircle />
                      </Link>
                    </span>
                  </TableHead>
                </TableRow>
              )
            })}
          </ScrollArea>
        </TableBody>
      </Table>

      <Separator orientation="horizontal" />

      <Pagination pageIndex={0} totalCount={105} parPage={10} />
    </>
  )
}
