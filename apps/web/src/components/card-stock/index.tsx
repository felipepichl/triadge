import { PortfolioResponseDTO } from '@umabel/core'
import { ChevronUp } from 'lucide-react'

import { NotFound } from '../not-found'
import { SellStock } from '../sell-stock'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '../ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import { Separator } from '../ui/separator'
import { InfoRow } from './info-row'
import { CardStockSkeleton } from './skeleton'

type CardStockProps = {
  wallet: PortfolioResponseDTO | undefined
  isLoading?: boolean
}

export function CardStock({ wallet, isLoading = false }: CardStockProps) {
  if (isLoading) {
    return (
      <Carousel>
        <CarouselContent className="pt-6 max-sm:py-0">
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index}>
              <CardStockSkeleton />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex h-min w-full items-center justify-center pt-6">
          <div className="flex justify-between space-x-16">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>
      </Carousel>
    )
  }

  return (
    <Carousel>
      <CarouselContent className="pt-6 max-sm:py-0">
        {wallet?.portfolio.length === 0 ? (
          <NotFound />
        ) : (
          wallet?.portfolio.map((item) => (
            <CarouselItem key={item.stock.shortName}>
              <Card className="bg-gray-300 dark:bg-gray-700 max-sm:rounded-none">
                <CardHeader className="flex-row justify-between">
                  <div>
                    <CardDescription className="truncate font-semibold text-gray-500 dark:text-slate-200">
                      {item.stock.shortName}
                    </CardDescription>
                    <CardDescription>{item.stock.symbol}</CardDescription>
                  </div>
                  <SellStock
                    symbol={item.stock.symbol}
                    position={item.stock.totalStock}
                    quote={item.quote}
                  />
                </CardHeader>

                <Separator className="bg-gray-600" />

                <CardContent className="grid grid-rows-2 gap-2 p-5">
                  <InfoRow label="Valor Investido" value={item.totalInvested} />
                  <InfoRow label="Posição Atual" value={item.currentValue} />
                  <InfoRow
                    label="Quantidade"
                    value={item.stock.totalStock}
                    isValueFormatted={false}
                  />

                  <Separator className="mt-6 bg-gray-600" />

                  <InfoRow label="Preço atual" value={item.quote} />
                  <InfoRow label="Menor compra" value={item.minPrice} />
                  <InfoRow label="Maior compra" value={item.maxPrice} />
                </CardContent>

                <Separator className="bg-gray-600" />

                <CardFooter className="flex-1 items-center justify-between p-5">
                  <CardDescription className="font-semibold text-gray-500 dark:text-slate-200">
                    Dividendos
                  </CardDescription>
                  <ChevronUp className="rotate-90" />
                </CardFooter>
              </Card>
            </CarouselItem>
          ))
        )}
      </CarouselContent>
      <div className="flex h-min w-full items-center justify-center pt-6">
        <div className="flex justify-between space-x-16">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
    </Carousel>
  )
}
