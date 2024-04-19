import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react'
import { useCallback, useState } from 'react'

import {
  apiListAllTransactionCategory,
  TransactionCategory,
} from '@/api/list-all-transaction-category'

import { Button } from '../../ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '../../ui/drawer'
import { Input } from '../../ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'
import { Separator } from '../../ui/separator'
import { NewCategory } from '../category/new-category'

export function NewTransaction() {
  const [transactionCategories, setTransactionCategories] =
    useState<TransactionCategory[]>()

  const handleAllTransactionCategories = useCallback(async () => {
    const response = await apiListAllTransactionCategory()

    setTransactionCategories(response)
  }, [])

  return (
    <div className="flex justify-end pb-3">
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-40 min-w-40 rounded-sm bg-green-500 text-slate-100 hover:bg-green-700 hover:text-slate-100"
            onClick={handleAllTransactionCategories}
          >
            Nova transação
          </Button>
        </DrawerTrigger>
        <DrawerContent>
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
                        {transactionCategories &&
                          transactionCategories.map((category) => (
                            <SelectItem
                              key={category._id}
                              value={category.description}
                            >
                              {category.description}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <NewCategory />
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

                <Button className="h-12 w-full bg-green-500 font-bold hover:border-green-700 hover:bg-green-700 hover:text-slate-100">
                  Cadastrar
                </Button>
              </div>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
