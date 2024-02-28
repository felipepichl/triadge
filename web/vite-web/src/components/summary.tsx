import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export function Summary() {
  return (
    <div className="max-w-1120 mx-auto grid w-full grid-cols-3 gap-8 px-4">
      <Card className="bg-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardDescription className="font-bold text-slate-200">
            Entradas
          </CardDescription>
          <ArrowDownCircle size={32} color="#00b37e" />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-white">R$ 17.000,00</CardTitle>
        </CardContent>
      </Card>
      <Card className="bg-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardDescription className="font-bold text-slate-200">
            Saídas
          </CardDescription>
          <ArrowUpCircle size={32} color="#f75a68" />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-white">Saídas</CardTitle>
        </CardContent>
      </Card>
      <Card className="bg-lime-600">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardDescription className="font-bold text-slate-200">
            Total
          </CardDescription>
          <DollarSign size={32} color="#fff" />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-white">R$ 17.000,00</CardTitle>
        </CardContent>
      </Card>
    </div>
  )
}
