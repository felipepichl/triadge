import { format } from 'date-fns'
import { Calendar, Tag } from 'lucide-react'
import { useCallback, useState } from 'react'

import { AccountPayableDetailDTO } from '@/dtos/account-payable-dto'
import { TransactionDetailDTO } from '@/dtos/transaction-dto'
import { useAccountPayable } from '@/hooks/use-account-payable'
import { priceFormatter } from '@/util/formatter'

import { NotFound } from '../not-found'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'
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
import { Switch } from '../ui/switch'
import { UpdateAmountVariableToAccountPayable } from '../update-amount-variable-to-account-payable'

type BaseCardTransactionAccount = {
  transactions?: TransactionDetailDTO[] | undefined
}

type WithAccountsPayable = BaseCardTransactionAccount & {
  accountsPayable: AccountPayableDetailDTO[] | undefined
  type: 'fixed' | 'unfixed'
}

type WithoutAccountsPayable = BaseCardTransactionAccount & {
  accountsPayable?: undefined
  type?: never
}

type CardTransactionAccount = WithAccountsPayable | WithoutAccountsPayable

export function CardTransactionAccount({
  transactions,
  accountsPayable,
  type = 'fixed',
}: CardTransactionAccount) {
  const [isOpen, setIsOpen] = useState(false)
  const [accountPayableId, setAccountPayableId] = useState<string>('')

  const { markAccountPayableAsPaid } = useAccountPayable()

  const data = transactions || accountsPayable

  const handleMarkAsPaid = useCallback(async () => {
    setIsOpen((prevState) => !prevState)

    await markAccountPayableAsPaid({ accountPayableId })
  }, [accountPayableId, markAccountPayableAsPaid])

  return (
    <>
      <Carousel>
        <CarouselContent className="pt-4">
          {data?.length === 0 ? (
            <NotFound />
          ) : (
            data?.map((item) => {
              const isTransaction = 'type' in item
              const isAccountPayable = 'isPaid' in item

              const formattedDate = isTransaction
                ? format(new Date(item.date), 'dd/MM/yyyy')
                : format(new Date(item.dueDate), 'dd/MM/yyyy')

              return (
                <CarouselItem key={item._id}>
                  <Card
                    className={` ${accountsPayable && 'max-sm:rounded-none'} bg-gray-300 dark:bg-gray-700`}
                  >
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardDescription className="truncate font-semibold text-gray-500 dark:text-slate-200">
                        {item.description}
                      </CardDescription>

                      {accountsPayable && (
                        <Switch
                          className="data-[state=unchecked]:bg-rose-500"
                          checked={isAccountPayable && item.isPaid}
                          disabled={isAccountPayable && item.isPaid}
                          onCheckedChange={() => {
                            setIsOpen(true)
                            setAccountPayableId(item._id)
                          }}
                        />
                      )}
                    </CardHeader>
                    <CardContent className="flex flex-row items-center justify-between">
                      <CardTitle
                        className={`font-bold ${
                          (isTransaction && item.type === 'outcome') ||
                          (isAccountPayable && !item.isPaid)
                            ? 'text-red-500'
                            : 'text-green-500'
                        }`}
                      >
                        {priceFormatter.format(item.amount)}
                      </CardTitle>

                      {isAccountPayable && (
                        <UpdateAmountVariableToAccountPayable
                          type={type}
                          accountPayableId={item._id}
                        />
                      )}
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
                </CarouselItem>
              )
            })
          )}
        </CarouselContent>
        <div className="flex h-min w-full items-center justify-center p-4">
          <div className="flex justify-between space-x-16">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>
      </Carousel>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Atenção!</AlertDialogTitle>
            <AlertDialogDescription>
              Após marcar como paga, não será possível alterar
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="sm:w-28 md:w-28">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="sm:w-28  md:w-28"
              onClick={handleMarkAsPaid}
            >
              Pagar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
