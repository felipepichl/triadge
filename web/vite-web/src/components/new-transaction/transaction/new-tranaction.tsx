import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react'
import { ChangeEvent, useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  apiListAllTransactionCategory,
  TransactionCategory,
} from '@/api/list-all-transaction-category'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
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
  description: z.string().min(1, { message: 'Campo obrigatório' }),
  detail: z.string(),
  type: z.string().min(1, { message: 'Selecione uma opção' }),
  value: z.string().min(1, { message: 'Campo obrigatório' }),
  transactionCategoryId: z.string().min(1, { message: 'Selecione uma opção' }),
})

type CreateTransactionForm = z.infer<typeof createTransactionForm>

export function NewTransaction() {
  const [transactionCategories, setTransactionCategories] =
    useState<TransactionCategory[]>()
  const [selectedValue, setSelectedValue] = useState('')
  const { formattedValue, handleMaskChange } = useMonetaryMask()

  const form = useForm<CreateTransactionForm>({
    resolver: zodResolver(createTransactionForm),
    defaultValues: {
      description: '',
      detail: '',
      type: '',
      value: '',
      transactionCategoryId: '',
    },
  })

  const handleAllTransactionCategories = useCallback(async () => {
    const response = await apiListAllTransactionCategory()

    setTransactionCategories(response)
  }, [])

  const handleTypeChange = useCallback(
    (type: string) => {
      form.setValue('type', type)
      setSelectedValue(type)
    },
    [form, setSelectedValue],
  )

  const handleCreateNewTransaction = useCallback(
    async ({
      description,
      value,
      type,
      transactionCategoryId,
    }: CreateTransactionForm) => {
      try {
        console.log('SUBMIT')

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

            <Form {...form}>
              <form
                className="mt-3 space-y-4"
                onSubmit={form.handleSubmit(handleCreateNewTransaction)}
              >
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={() => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Descrição"
                            {...form.register('description')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="value"
                    render={() => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="h-10"
                            placeholder="Valor"
                            value={formattedValue}
                            {...form.register('value', {
                              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                                handleMaskChange(e)
                              },
                            })}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-center gap-2">
                    <Controller
                      name="transactionCategoryId"
                      control={form.control}
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
                      {...form.register('type')}
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
            </Form>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
