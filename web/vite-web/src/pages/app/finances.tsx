import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react'

import { Summary } from '@/components/summary'

export function Finances() {
  return (
    <div className="max-w-1120 mx-auto grid w-full grid-cols-3 gap-8 px-4">
      <Summary
        description="Entradas"
        color="default"
        icon={ArrowDownCircle}
        iconColor="#00b37e"
        value="R$ 17.000,00"
      />
      <Summary
        description="Saídas"
        color="default"
        icon={ArrowUpCircle}
        iconColor="#f75a68"
        value="R$ 1.000,00"
      />
      <Summary
        description="Total"
        color="green"
        icon={DollarSign}
        iconColor="#ffff"
        value="R$ 16.000,00"
      />
    </div>
  )
}
