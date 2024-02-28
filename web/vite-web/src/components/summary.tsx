import * as React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

type SummaryProps = {
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
    <Card className={color === 'green' ? 'bg-green-500' : 'bg-gray-700'}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardDescription className="font-bold text-slate-200">
          {description}
        </CardDescription>
        <Icon size={32} color={iconColor} />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-white">{value}</CardTitle>
      </CardContent>
    </Card>
  )
}
