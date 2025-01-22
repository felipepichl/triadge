import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, ScanBarcode, Tag } from 'lucide-react'
import { useState } from 'react'

import { AccountPayableDetailDTO } from '@/dtos/account-payable-dto'
import { TransactionDetailDTO } from '@/dtos/transaction-dto'
import { priceFormatter } from '@/util/formatter'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'

interface CardTransactionAccount {
  transactions?: TransactionDetailDTO[]
  accountsPayable?: AccountPayableDetailDTO[]
}

export function CardTransactionAccount({
  transactions,
  accountsPayable,
}: CardTransactionAccount) {
  const [isMarkToPaidVisible, setMarkToPaidVisible] = useState(false)
  const data = transactions || accountsPayable

  const handleScanBarcodeClick = () => {
    setMarkToPaidVisible((prev) => !prev)
  }

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      orientation="vertical"
      className="mt-4 w-full"
    >
      <CarouselContent className="-mt-1 h-[180px]">
        {data?.map((item) => {
          const isTransaction = 'type' in item

          const formattedDate = isTransaction
            ? format(new Date(item.date), 'dd/MM/yyyy')
            : format(new Date(item.dueDate), 'dd/MM/yyyy')

          return (
            <CarouselItem key={item._id} className="pt-1 md:basis-1/2">
              <AnimatePresence mode="sync">
                {!isMarkToPaidVisible && (
                  <motion.div
                    key="firstCard"
                    initial={{ opacity: 0, x: '-100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '100%' }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                    className="z-[100]"
                  >
                    <Card className="mb-2 bg-gray-300 dark:bg-gray-700">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardDescription className="font-semibold text-gray-500 dark:text-slate-200">
                          {item.description}
                        </CardDescription>

                        <button onClick={handleScanBarcodeClick}>
                          <ScanBarcode />
                        </button>
                      </CardHeader>
                      <CardContent>
                        <CardTitle
                          className={`font-bold ${
                            isTransaction
                              ? item.type === 'outcome'
                                ? 'text-red-500'
                                : 'text-green-500'
                              : ''
                          }`}
                        >
                          {priceFormatter.format(item.amount)}
                        </CardTitle>
                      </CardContent>

                      <CardFooter className="flex items-center justify-between gap-4 px-6 pb-6">
                        <div className="flex items-center overflow-hidden">
                          <Tag
                            size={16}
                            className="mr-2 flex-shrink-0 text-gray-500 dark:text-gray-400"
                          />
                          <span className="truncate font-semibold text-gray-500 dark:text-gray-400">
                            {item.financialCategory?.description}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Calendar
                            size={16}
                            className="mr-2 text-gray-500 dark:text-gray-400"
                          />
                          <span className="font-semibold text-gray-500 dark:text-gray-400">
                            {formattedDate}
                          </span>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                )}
                {isMarkToPaidVisible && (
                  <motion.div
                    key="secondCard"
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '-100%' }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                    className="z-[100]"
                  >
                    <Card className="mb-2 bg-gray-300 dark:bg-gray-700">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardDescription className="font-semibold text-gray-500 dark:text-slate-200">
                          Descrição
                        </CardDescription>

                        <button onClick={handleScanBarcodeClick}>
                          <ScanBarcode />
                        </button>
                      </CardHeader>
                      <CardContent>
                        <CardTitle
                          className={`text-red-500text-green-500') font-bold `}
                        >
                          PAGAR
                        </CardTitle>
                      </CardContent>

                      <CardFooter className="flex items-center justify-between gap-4 px-6 pb-6">
                        <div className="flex items-center overflow-hidden">
                          <Tag
                            size={16}
                            className="mr-2 flex-shrink-0 text-gray-500 dark:text-gray-400"
                          />
                          <span className="truncate font-semibold text-gray-500 dark:text-gray-400">
                            Categoria
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Calendar
                            size={16}
                            className="mr-2 text-gray-500 dark:text-gray-400"
                          />
                          <span className="font-semibold text-gray-500 dark:text-gray-400">
                            11/08/1991
                          </span>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <div className="flex h-min w-full items-center justify-center">
        <div className="max-w-lg p-4">
          <div className="flex justify-between space-x-16">
            <CarouselPrevious className="rotate-90" />
            <CarouselNext className="rotate-90" />
          </div>
        </div>
      </div>
    </Carousel>
  )
}
