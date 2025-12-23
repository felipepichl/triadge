import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Skeleton } from '../ui/skeleton'

type ColorType = 'default' | 'green' | 'rose'

const colorClasses = {
  default: 'bg-gray-300 dark:bg-gray-700',
  green: 'bg-green-600',
  rose: 'bg-rose-500',
}

type SummarySkeletonProps = {
  color?: ColorType
}

export function SummarySkeleton({ color = 'default' }: SummarySkeletonProps) {
  return (
    <Card className={colorClasses[color] || colorClasses.default}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <Skeleton
            className={`h-4 w-20 mb-1 ${
              color === 'green' || color === 'rose'
                ? 'bg-slate-200'
                : 'bg-gray-400 dark:bg-gray-600'
            }`}
          />
        </div>
        <Skeleton
          className={`h-8 w-8 rounded ${
            color === 'green' || color === 'rose'
              ? 'bg-slate-200'
              : 'bg-gray-400 dark:bg-gray-600'
          }`}
        />
      </CardHeader>
      <CardContent>
        <Skeleton
          className={`h-8 w-24 ${
            color === 'green' || color === 'rose'
              ? 'bg-slate-200'
              : 'bg-gray-400 dark:bg-gray-600'
          }`}
        />
      </CardContent>
    </Card>
  )
}


