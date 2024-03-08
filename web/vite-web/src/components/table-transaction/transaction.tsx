import { ArrowRightCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Table, TableBody, TableHead, TableRow } from '../ui/table'

export function Transaction() {
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

        <TableRow>
          <TableHead>Material de expediente</TableHead>
          <TableHead>R$ 120,00</TableHead>
          <TableHead>Interno</TableHead>
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
