import { ArrowRightCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

// import { TransactionsData } from './transactions'
import { Transaction } from '@/api/list-all-transaction'
import { priceFormatter } from '@/util/formatter'

import { Pagination } from '../pagination'
import { Separator } from '../ui/separator'
import { Table, TableBody, TableHead, TableRow } from '../ui/table'

export function TableTransactions({ transactions: data }: Transaction) {
  return (
    <>
      <Table className="hidden md:table md:basis-1/2">
        <TableBody>
          {data.map((transaction) => {
            const rowClass =
              transaction.type === 'outcome' ? 'text-red-500' : ''
            return (
              <TableRow key={transaction.description}>
                <TableHead className={rowClass}>
                  {transaction.description}
                </TableHead>
                <TableHead className={rowClass}>
                  {priceFormatter.format(transaction.value)}
                </TableHead>
                <TableHead className={rowClass}>
                  {transaction.transactionCategory.description}
                </TableHead>
                <TableHead className={rowClass}>13/03/2025</TableHead>
                <TableHead className="flex items-center justify-center">
                  <Link to="/finance/details">
                    <ArrowRightCircle />
                  </Link>
                </TableHead>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <Separator orientation="horizontal" />

      <Pagination pageIndex={0} totalCount={105} parPage={10} />
    </>
  )
}
