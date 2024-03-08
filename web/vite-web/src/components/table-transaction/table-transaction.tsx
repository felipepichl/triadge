import { ArrowRightCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Table, TableBody, TableHead, TableRow } from '../ui/table'

export function TableTransaction() {
  return (
    <Table className="mt-11 hidden md:table md:basis-1/2">
      <TableBody>
        <TableRow>
          <TableHead>Desenvolvimento de site</TableHead>
          <TableHead>R$ 1.200,00</TableHead>
          <TableHead>Venda</TableHead>
          <TableHead className="text-right">13/03/2025</TableHead>
          <TableHead className="flex items-center justify-center">
            <Link to="/finance/details">
              <ArrowRightCircle />
            </Link>
          </TableHead>
        </TableRow>
      </TableBody>
    </Table>
  )
}
