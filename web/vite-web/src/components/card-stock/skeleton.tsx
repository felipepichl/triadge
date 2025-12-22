import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'

export function CardStockSkeleton() {
  return (
    <Card className="bg-gray-300 dark:bg-gray-700 max-sm:rounded-none">
      <CardHeader className="flex-row justify-between">
        <div className="flex-1">
          <Skeleton className="mb-1 h-4 w-32" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-8 w-8 rounded" />
      </CardHeader>

      <Separator className="bg-gray-600" />

      <CardContent className="grid grid-rows-2 gap-2 p-5">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>

        <Separator className="mt-6 bg-gray-600" />

        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>

      <Separator className="bg-gray-600" />

      <CardFooter className="flex-1 items-center justify-between p-5">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
      </CardFooter>
    </Card>
  )
}
