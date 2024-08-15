import { Helmet } from 'react-helmet-async'
import { Pie, PieChart, Sector } from 'recharts'
import { PieSectorDataItem } from 'recharts/types/polar/Pie'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { useAuth } from '@/hooks/use-auth'

const chartData = [
  { income: 'chrome', visitors: 275, fill: '#00b37e' },
  { outcome: 'safari', visitors: 200, fill: '#ff0000' },
  { total: 'firefox', visitors: 187, fill: '#fff' },
]

const chartConfig = {
  income: {
    label: 'Entrada',
    color: '#00b37e',
  },
  outcome: {
    label: 'Saída',
    color: '#ff0000',
  },
  total: {
    label: 'Total',
    color: '#fff',
  },
} satisfies ChartConfig

export function Dashboard() {
  const { user } = useAuth()

  return (
    <>
      <Helmet title="Dashboard" />
      <CardTitle className="p-4">Olá, {user?.name}</CardTitle>

      <Card className="mx-auto flex aspect-square max-h-[400px] flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Transações</CardTitle>
          <CardDescription>Agosto - Setembro 2024 </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={0}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <Sector {...props} outerRadius={outerRadius + 10} />
                )}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  )
}
