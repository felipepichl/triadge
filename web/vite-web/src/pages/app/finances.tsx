import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react'

import { Summary } from '@/components/summary'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export function Finances() {
  return (
    <>
      {/* <div
        className="
      max-w-1120 
      mx-auto 
      hidden 
      w-full
      grid-cols-3
      gap-8
      px-4
      lg:grid
      "
      >
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
      </div> */}

      <Carousel className="grid grid-rows-2">
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
              <Summary
                description="Entradas"
                color="default"
                icon={ArrowDownCircle}
                iconColor="#00b37e"
                value="R$ 17.000,00"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center bg-white">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </>
  )
}
