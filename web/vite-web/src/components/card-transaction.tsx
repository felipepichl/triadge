import { Calendar, Tag } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export function CardTransction() {
  return (
    <Card className="bg-gray-300 dark:bg-gray-700 md:hidden md:basis-1/2">
      <CardHeader>
        <CardDescription
          className="
          font-semibold
          text-gray-500 
          dark:text-slate-200 
          "
        >
          Desenvolvimento de site
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardTitle className={'font-bold text-green-500'}>
          R$ 1.200,00
        </CardTitle>
      </CardContent>

      <div className="flex items-center justify-between px-6 pb-6">
        <div className="flex items-center">
          <Tag
            size={16}
            className="mr-2 text-gray-500 
            dark:text-gray-400"
          />
          <span
            className="
              font-semibold
            text-gray-500 
            dark:text-gray-400
          "
          >
            Venda
          </span>
        </div>
        <div className="flex items-center">
          <Calendar
            size={16}
            className="mr-2 text-gray-500 
            dark:text-gray-400"
          />
          <span
            className="
                font-semibold
              text-gray-500 
              dark:text-gray-400
            "
          >
            13/04/2024
          </span>
        </div>
      </div>
    </Card>
  )
}
