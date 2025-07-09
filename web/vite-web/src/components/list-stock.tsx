import { useStock } from '@/hooks/use-stock'

import { CardStock } from './card-stock'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'

type ListStockProps = {
  type: 'fii' | 'stock'
}

export function ListStock({ type }: ListStockProps) {
  const { portfolio } = useStock()

  return (
    <Card className="mb-4 flex min-h-[574px] flex-col lg:mr-4 lg:w-[480px]">
      <CardHeader>
        <CardTitle>
          {type === 'fii' ? 'Fundos Imobiliários' : 'Ações'}
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="max-sm:px-0">
        <CardStock wallet={portfolio} />
      </CardContent>
    </Card>
  )
}
