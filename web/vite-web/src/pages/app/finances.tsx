import {
  ArrowDownCircle,
  ArrowUpCircle,
  CircleFadingPlus,
  DollarSign,
  Search,
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import { Summary, SummaryProps } from '@/components/summary'
import {
  Transactions,
  TransactionsProps,
} from '@/components/transactions/transactions'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

const summaries: SummaryProps[] = [
  {
    color: 'default',
    description: 'Entradas',
    icon: ArrowDownCircle,
    iconColor: '#00b37e',
    value: 'R$ 17.000,00',
  },
  {
    color: 'default',
    description: 'Saídas',
    icon: ArrowUpCircle,
    iconColor: '#ff0000',
    value: 'R$ 1.000,00',
  },
  {
    color: 'green',
    description: 'Total',
    icon: DollarSign,
    iconColor: '#fff',
    value: 'R$ 16.000,00',
  },
]

const transactions: TransactionsProps[] = [
  {
    descrition: 'Desenvolvimento de site',
    value: 'R$ 1.200,00',
    category: 'Venda',
  },
  {
    descrition: 'Update de Servidor',
    value: 'R$ 1.300,00',
    category: 'Venda',
  },
  {
    descrition: 'Update de Servidor II',
    value: 'R$ 1.300,00',
    category: 'Venda',
  },
  {
    descrition: 'Update de Servidor IV',
    value: 'R$ 1.300,00',
    category: 'Venda',
  },
]

export function Finances() {
  return (
    <>
      <Helmet title="Finanças" />

      <div className="flex justify-end pb-3">
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="w-40 min-w-40 rounded-sm bg-green-500 text-slate-100 hover:bg-green-700 hover:text-slate-100"
            >
              Nova transação
            </Button>
          </DrawerTrigger>
          <DrawerContent className="">
            <div className="mt-3 p-4">
              <DrawerTitle>Nova Transação</DrawerTitle>

              <form className="mt-3 space-y-4">
                <div className="space-y-2">
                  <Input className="h-10" placeholder="Descrição" />

                  <Input className="h-10" placeholder="Preço" />
                  <div className="flex items-center justify-center gap-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="sell">Venda</SelectItem>
                          <SelectItem value="card">
                            Cartão de Crédito
                          </SelectItem>
                          <SelectItem value="work">
                            Empresa Filial 01
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      className={`
                        flex 
                        min-w-10 
                        items-center 
                        justify-center 
                        rounded-sm 
                        border-green-500 
                        text-green-500 
                        hover:border-green-700 
                        hover:bg-green-700
                        hover:text-slate-100 
                      `}
                      size="icon"
                    >
                      <CircleFadingPlus className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="mx-auto grid max-w-screen-md grid-cols-2 gap-2">
                    <Button
                      className="h-12 w-full text-base sm:w-auto"
                      variant="outline"
                    >
                      <ArrowDownCircle className="mr-2" color="#00b37e" />
                      Entrada
                    </Button>
                    <Button
                      className="h-12 w-full text-base sm:w-auto"
                      variant="outline"
                    >
                      <ArrowUpCircle className="mr-2" color="#ff0000" />
                      Saída
                    </Button>
                  </div>

                  <Separator />

                  <Button className="h-12 w-full bg-green-500 font-bold">
                    Cadastrar
                  </Button>
                </div>
              </form>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <Carousel>
        <CarouselContent>
          {summaries.map((summary) => (
            <CarouselItem
              className="md:basis-1/2 lg:basis-1/3"
              key={summary.description}
            >
              <Summary
                description={summary.description}
                color={summary.color}
                icon={summary.icon}
                iconColor={summary.iconColor}
                value={summary.value}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex h-min w-full items-center justify-center lg:hidden">
          <div className="max-w-lg p-4">
            <div className="flex justify-between space-x-16">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </div>
        </div>
      </Carousel>

      <div className="mb-4 flex items-center justify-between gap-2 lg:pt-10">
        <Input />
        <Button
          variant="outline"
          className={`
            flex 
            w-10 
            items-center 
            justify-center 
            rounded-sm 
            border-green-500 
            text-green-500 
            hover:border-green-700 
            hover:bg-green-700 
            hover:text-slate-100 md:w-40
          `}
          size="icon"
        >
          <Search className="mr-0 h-4 w-4 md:mr-1 md:h-5 md:w-5" />
          <span className="hidden md:inline">Buscar</span>
        </Button>
      </div>

      <Transactions data={transactions} />
    </>
  )
}
