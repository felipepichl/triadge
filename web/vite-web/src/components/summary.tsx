import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react'

import { Card, CardHeader, CardTitle } from './ui/card'

export function Summary() {
  return (
    <div className="max-w-1120 mx-auto grid w-full grid-cols-3 gap-8 px-4">
      <Card className="bg-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Entradas</CardTitle>
          <ArrowDownCircle size={32} color="#00b37e" />
        </CardHeader>
      </Card>
      <Card className="bg-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Saídas</CardTitle>
          <ArrowUpCircle size={32} color="#f75a68" />
        </CardHeader>
      </Card>
      <Card className="bg-lime-600">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Total</CardTitle>
          <DollarSign size={32} color="#fff" />
        </CardHeader>
      </Card>
    </div>
  )
}
