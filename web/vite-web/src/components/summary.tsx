import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react'

import { Card, CardHeader, CardTitle } from './ui/card'

export function Summary() {
  return (
    <div className="max-w-1120 mx-auto grid w-full grid-cols-3 gap-8 px-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Entradas</CardTitle>
          <ArrowUpCircle />
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Saídas</CardTitle>
          <ArrowDownCircle />
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Total</CardTitle>
          <DollarSign />
        </CardHeader>
      </Card>
    </div>
  )
}
