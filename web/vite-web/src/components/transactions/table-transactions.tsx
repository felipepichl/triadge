import { ArrowRightCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Pagination } from '../pagination'
import { Separator } from '../ui/separator'
import { Table, TableBody, TableHead, TableRow } from '../ui/table'
import { TransactionsData } from './transactions'

export function TableTransactions({ data }: TransactionsData) {
  return (
    <>
      <Table className="hidden md:table md:basis-1/2">
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

      <Separator orientation="horizontal" />

      <Pagination pageIndex={0} totalCount={105} parPage={10} />
    </>
  )
}
