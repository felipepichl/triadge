import * as React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export type SummaryProps = {
  color: 'default' | 'green'
  description: string
  icon: React.ElementType
  iconColor: string
  value: string
}

export function Summary({
  color,
  description,
  icon: Icon,
  iconColor,
  value,
}: SummaryProps) {
  return (
    <Card
      className={
        color === 'green' ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-700'
      }
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardDescription
          className={`font-semibold ${
            color === 'green'
              ? 'text-slate-200'
              : 'text-gray-500 dark:text-slate-200'
          }`}
        >
          {description}
        </CardDescription>
        <Icon size={32} color={iconColor} />
      </CardHeader>
      <CardContent>
        <CardTitle
          className={
            color === 'green'
              ? 'text-slate-200'
              : 'text-gray-500 dark:text-slate-200'
          }
        >
          {value}
        </CardTitle>
      </CardContent>
    </Card>
  )
}
