import { Eye, EyeOff } from 'lucide-react'
import * as React from 'react'
import { useState } from 'react'

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
  const [showValue, setShowValue] = useState(false)

  const handleToggle = () => {
    setShowValue(!showValue)
  }

  return (
    <Card
      className={
        color === 'green' ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-700'
      }
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <CardDescription
            className={`font-semibold ${
              color === 'green'
                ? 'text-slate-200'
                : 'text-gray-500 dark:text-slate-200'
            }`}
          >
            {description}
          </CardDescription>
          {description === 'Total' && (
            <div className="flex flex-row items-center justify-center">
              <CardDescription
                className={`font-semibold ${
                  color === 'green'
                    ? 'text-slate-200'
                    : 'text-gray-500 dark:text-slate-200'
                }`}
                style={{ minWidth: `${value.length}ch` }}
              >
                {showValue ? value : '****'}
              </CardDescription>
              <button onClick={handleToggle} className="ml-2">
                {showValue ? (
                  <Eye className="text-slate-200" size={18} />
                ) : (
                  <EyeOff className="text-slate-200" size={18} />
                )}
              </button>
            </div>
          )}
        </div>
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
