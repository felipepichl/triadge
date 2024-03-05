import { Calendar, Tag } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

export function CardTransction() {
  return (
    <Card className="bg-gray-300 dark:bg-gray-700">
      <CardHeader>
        <CardDescription
          className="
          font-semibold 
          text-gray-500 
          dark:text-slate-200"
        >
          Desenvolvimento de site
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardTitle className={'text-green-500'}>R$ 1.200,00</CardTitle>
      </CardContent>
      <CardFooter>
        <div className="grid grid-cols-2">
          <div className="flex items-center">
            <Tag size={16} className="mr-2" />
            <span>Venda</span>
          </div>
          <div className="flex items-center">
            <Calendar size={16} className="mr-4" />
            <span>13/04/2024</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
