import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import { Summary, SummaryProps } from './summary'

type SummaryCarouselProps = {
  summaries: SummaryProps[] | undefined
  boxes: number
}

export function SummaryCarousel({ summaries, boxes }: SummaryCarouselProps) {
  return (
    <Carousel>
      <CarouselContent>
        {summaries?.map((summary) => (
          <CarouselItem
            className={`md:basis-1/2 lg:basis-1/${boxes}`}
            key={summary.description}
          >
            <Summary
              description={summary.description}
              color={summary.color}
              icon={summary.icon}
              iconColor={summary.iconColor}
              value={summary.value}
              totalAmount={summary.totalAmount}
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
  )
}
