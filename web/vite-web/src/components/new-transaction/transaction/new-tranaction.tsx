import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  apiListAllTransactionCategory,
  TransactionCategory,
} from '@/api/list-all-transaction-category'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useMonetaryMask } from '@/hooks/use-monetary-mask'

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

const createTransactionForm = z.object({
  description: z.string(),
  detail: z.string(),
  type: z.string(),
  value: z.number(),
  transactionCategoryId: z.string(),
})

type CreateTransactionForm = z.infer<typeof createTransactionForm>

export function NewTransaction() {
  const [transactionCategories, setTransactionCategories] =
    useState<TransactionCategory[]>()
  const [selectedValue, setSelectedValue] = useState('')
  const { formattedValue, handleMaskChange } = useMonetaryMask()

  const { register, handleSubmit, control, setValue } =
    useForm<CreateTransactionForm>()

  const handleAllTransactionCategories = useCallback(async () => {
    const response = await apiListAllTransactionCategory()

    setTransactionCategories(response)
  }, [])

  const handleTypeChange = useCallback(
    (type: string) => {
      setValue('type', type)
      setSelectedValue(type)
    },
    [setValue, setSelectedValue],
  )

  const handleCreateNewTransaction = useCallback(
    async ({
      description,
      value,
      type,
      transactionCategoryId,
    }: CreateTransactionForm) => {
      try {
        console.log(description)
        console.log(value)
        console.log(type)
        console.log(transactionCategoryId)

        toast.success('Transação salva com sucesso!')
      } catch (err) {
        toast.error('Erro ao salvar, tente novamente mais tarde!')
      }
    },
    [],
  )

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

            <form
              className="mt-3 space-y-4"
              onSubmit={handleSubmit(handleCreateNewTransaction)}
            >
              <div className="space-y-2">
                <Input
                  className="h-10"
                  placeholder="Descrição"
                  {...register('description')}
                />

                <Input
                  className="h-10"
                  placeholder="Valor"
                  value={formattedValue}
                  {...register('value')}
                  onChange={handleMaskChange}
                />
                <div className="flex items-center justify-center gap-2">
                  <Controller
                    name="transactionCategoryId"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Select onValueChange={onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {transactionCategories &&
                              transactionCategories.map((category) => (
                                <SelectItem
                                  key={category._id}
                                  value={category._id}
                                >
                                  {category.description}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  <NewCategory />
                </div>

                <RadioGroup className="mx-auto grid max-w-screen-md grid-cols-2 gap-2">
                  <Button
                    data-current={selectedValue}
                    className="h-12 w-full text-base data-[current=income]:bg-green-500 data-[current=income]:text-white sm:w-auto"
                    variant="outline"
                    type="button"
                    onClick={() => handleTypeChange('income')}
                  >
                    <RadioGroupItem value="income" asChild />
                    <ArrowDownCircle
                      className="mr-2"
                      color={`${selectedValue === 'income' ? '#fff' : '#00b37e'}`}
                    />
                    Entrada
                  </Button>

                  <Button
                    data-current={selectedValue}
                    className="h-12 w-full text-base data-[current=outcome]:bg-red-700 data-[current=outcome]:text-white sm:w-auto "
                    variant="outline"
                    type="button"
                    {...register('type')}
                    onClick={() => handleTypeChange('outcome')}
                  >
                    <RadioGroupItem value="outcome" asChild />
                    <ArrowUpCircle
                      className="mr-2"
                      color={`${selectedValue === 'outcome' ? '#fff' : '#ff0000'}`}
                    />
                    Saída
                  </Button>
                </RadioGroup>

                <Separator />

                <Button
                  className="h-12 w-full bg-green-500 font-bold hover:border-green-700 hover:bg-green-700 hover:text-slate-100"
                  type="submit"
                >
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
