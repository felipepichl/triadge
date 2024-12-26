import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  apiListAllFinancialCategoryByUser,
  FinancialCategory,
} from '@/api/list-all-financial-category-by-user'
import {
  apiListAllSubcategoryByCategory,
  Subcategory,
} from '@/api/list-all-subcategory-by-category'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useMonetaryMask } from '@/hooks/use-monetary-mask'
import { useTransaction } from '@/hooks/use-transaction'

import { NewFinancialCategoryOrSubcategory } from '../new-financial-category-or-subcategory/new-financial-category-or-subcategory'
import { Button } from '../ui/button'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { AccountPayableFiled } from './account-payable/account-payable-field'
import { CategorySelect } from './category-select/category-select'
import { TransactionField } from './transaction/transaction-field'

type NewAccountTransactionProps = {
  title: string
  type: 'transaction' | 'accountPayable'
}

export function NewTransaction({ title, type }: NewAccountTransactionProps) {
  const [financialCategories, setFinancialCategories] = useState<
    FinancialCategory[]
  >([])
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const [parentCategoryId, setParentCategoryId] = useState<string>('')
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean | undefined>(
    undefined,
  )

  const { formattedValue, handleMaskChange, rawValue } = useMonetaryMask()
  const { createTransaction } = useTransaction()

  const createTransactionForm = z
    .object({
      description: z.string().min(1, { message: 'Campo obrigatório' }),
      amount: z.string().min(1, { message: 'Campo obrigatório' }),
      date: z.date(),
      type: z.string().min(1, { message: 'Selecione uma opção' }),
      financialCategoryId: z
        .string()
        .min(1, { message: 'Selecione uma opção' }),
      subcategory: z.string().optional(),
    })
    .refine(
      (data) => {
        if (subcategories.length > 0 && !data.subcategory) {
          return false
        }
        return true
      },
      {
        message: 'Selecione uma opção',
        path: ['subcategory'],
      },
    )

  type CreateTransactionForm = z.infer<typeof createTransactionForm>

  const form = useForm<CreateTransactionForm>({
    resolver: zodResolver(createTransactionForm),
    defaultValues: {
      description: '',
      amount: '',
      date: new Date(),
      type: '',
      financialCategoryId: '',
      subcategory: '',
    },
  })

  function handleToggleDrawer() {
    setIsDrawerOpen(undefined)
  }

  const cleanFileds = useCallback(() => {
    setIsDrawerOpen(false)
    form.reset()
  }, [form])

  const handleAllFinancialCategoryByUser = useCallback(async () => {
    const response = await apiListAllFinancialCategoryByUser()

    setFinancialCategories(response)
  }, [])

  const handleAllSubcategoryByCategory = useCallback(
    async (parentCategoryId: string) => {
      const response = await apiListAllSubcategoryByCategory({
        parentCategoryId,
      })

      setSubcategories(response)
    },
    [],
  )

  const handleCreateNewTransaction = useCallback(
    async ({
      description,
      type,
      date,
      financialCategoryId,
    }: CreateTransactionForm) => {
      try {
        createTransaction({
          description,
          amount: String(rawValue),
          type,
          date,
          financialCategoryId,
        })

        cleanFileds()
        toast.success('Transação salva com sucesso!')
      } catch (err) {
        console.log(err)
        toast.error('Erro ao salvar, tente novamente mais tarde!')
      }
    },
    [cleanFileds, createTransaction, rawValue],
  )

  useEffect(() => {
    if (subcategories.length > 0) {
      form.clearErrors('subcategory')
    }
  }, [subcategories, form])

  return (
    <div className="flex justify-end pb-3">
      <Drawer onOpenChange={handleToggleDrawer} open={isDrawerOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-48 min-w-48 rounded-sm bg-green-500 text-slate-100 hover:bg-green-700 hover:text-slate-100"
          >
            {title}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mt-3 p-4">
            <DrawerTitle>{title}</DrawerTitle>

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
                    name="amount"
                    render={() => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="h-10"
                            placeholder="Valor"
                            value={formattedValue}
                            // inputMode="numeric"
                            // type="number"
                            {...form.register('amount', {
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

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                initialFocus
                                selected={field.value}
                                onSelect={(date) => field.onChange(date)}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex  justify-center gap-2">
                    {/* <FormField
                      name="financialCategoryId"
                      control={form.control}
                      render={({ field: { onChange } }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                onChange(value)
                                setParentCategoryId(value)
                                handleAllSubcategoryByCategory(value)
                              }}
                              onOpenChange={handleAllFinancialCategoryByUser}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Categoria" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {financialCategories.length > 0 ? (
                                    financialCategories.map((category) => (
                                      <SelectItem
                                        key={category._id}
                                        value={category._id}
                                      >
                                        {category.description}
                                      </SelectItem>
                                    ))
                                  ) : (
                                    <SelectItem disabled value="not-found">
                                      Nenhum registro encontrado
                                    </SelectItem>
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}

                    <CategorySelect
                      control={form.control}
                      name="financialCategoryId"
                      options={financialCategories}
                      onValueChange={(value) => {
                        setParentCategoryId(value)
                        handleAllSubcategoryByCategory(value)
                      }}
                      onOpenChange={handleAllFinancialCategoryByUser}
                      placeholder="Categoria"
                    />

                    <NewFinancialCategoryOrSubcategory
                      title="Categoria"
                      type="financialCategory"
                    />
                  </div>

                  <div className="flex  justify-center gap-2">
                    {/* <FormField
                      name="subcategory"
                      control={form.control}
                      render={({ field: { onChange } }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Select
                              onValueChange={onChange}
                              onOpenChange={() =>
                                handleAllSubcategoryByCategory(parentCategoryId)
                              }
                              disabled={!parentCategoryId}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Subcategorias" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {subcategories.length > 0 ? (
                                    subcategories.map((subcategory) => (
                                      <SelectItem
                                        key={subcategory._id}
                                        value={subcategory._id}
                                      >
                                        {subcategory.description}
                                      </SelectItem>
                                    ))
                                  ) : (
                                    <SelectItem disabled value="not-found">
                                      Nenhum registro encontrado
                                    </SelectItem>
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}

                    <CategorySelect
                      control={form.control}
                      name="subcategory"
                      options={subcategories}
                      onOpenChange={() =>
                        handleAllSubcategoryByCategory(parentCategoryId)
                      }
                      placeholder="Subcategorias"
                      disabled={!parentCategoryId}
                    />

                    <NewFinancialCategoryOrSubcategory
                      title="Subcategoria"
                      type="subcategory"
                      parentCategoryId={parentCategoryId}
                      disable={!parentCategoryId}
                    />
                  </div>

                  {type === 'accountPayable' && <AccountPayableFiled />}

                  {type === 'transaction' && (
                    <TransactionField control={form.control} name="type" />
                  )}

                  <Separator />

                  <Button
                    className="h-12 w-full bg-green-500 font-bold hover:border-green-700 hover:bg-green-700 hover:text-slate-100"
                    type="submit"
                    disabled={false}
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
