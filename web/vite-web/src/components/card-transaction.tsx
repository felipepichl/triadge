import { Calendar, Tag } from 'lucide-react'

import { Card, CardContent, CardFooter, CardHeader } from './ui/card'

export function CardTransction() {
  return (
    <Card>
      <CardHeader>
        <span>Desenvolvimento de site</span>
      </CardHeader>
      <CardContent>
        <span>R$ 1.200,00</span>
      </CardContent>
      <CardFooter>
        <div>
          <Tag size={16} />
          <span>Venda</span>
        </div>
        <div>
          <Calendar size={16} />
          <span>13/04/2024</span>
        </div>
      </CardFooter>
    </Card>
  )
}
