import { zodResolver } from '@hookform/resolvers/zod'
import { Minus, Plus } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useBuyStock } from '@/features/stock/hooks/use-stock-mutations'
import { ApiError } from '@/shared/api/api-error'
import { DrawerForm } from '@/shared/components/drawer-form'
import { DatePicker } from '@/shared/components/generic-form-and-fields/fields/date-picker'
import { Monetary } from '@/shared/components/generic-form-and-fields/fields/monetary'
import { GenericForm } from '@/shared/components/generic-form-and-fields/generic-form'
import { SubmitButton } from '@/shared/components/generic-form-and-fields/submit-button'
import { Button } from '@/shared/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { parseCurrency } from '@/shared/util/formatter'

const formSchema = z.object({
  symbol: z.string().min(1, { message: 'Campo obrigatório' }),
  price: z.string().min(1, { message: 'Campo obrigatório' }),
  date: z.date(),
  quantity: z.number().min(1, {
    message: 'Quantidade deve ser maior que zero',
  }),
  type: z.string().min(1, { message: 'Selecione uma opção' }),
})

type CreateAssetForm = z.infer<typeof formSchema>

export function NewStock() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean | undefined>(
    undefined,
  )

  const buyStock = useBuyStock()

  const form = useForm<CreateAssetForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symbol: '',
      price: '',
      date: new Date(),
      quantity: 0,
      type: '',
    },
  })
  const quantity = form.watch('quantity')

  const handleToggleDrawer = useCallback(() => {
    setIsDrawerOpen((prevState) => !prevState)
  }, [])

  const handleCreateNewAsset = useCallback(
    async ({ symbol, price, date, quantity, type }: CreateAssetForm) => {
      try {
        const data = {
          symbol,
          price: parseCurrency(price),
          date,
          quantity: Number(quantity),
          type,
        }

        await buyStock.mutateAsync(data)
        handleToggleDrawer()
        form.reset()
        toast.success('Ativo salvo com sucesso!')
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.statusCode === 404) {
            toast.error('Ativo não encontrado')
          } else {
            toast.error(error.message)
          }
        }
      }
    },
    [buyStock, handleToggleDrawer, form],
  )

  return (
    <DrawerForm
      title="Novo ativo"
      isOpen={isDrawerOpen}
      onOpenChange={handleToggleDrawer}
    >
      <GenericForm
        onSubmit={handleCreateNewAsset}
        form={form}
        fields={
          <>
            <FormField
              control={form.control}
              name={'symbol'}
              render={() => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Código do ativo"
                      {...form.register('symbol')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Monetary name="price" placeholder="Valor pago" />
            <DatePicker />
            <FormField
              control={form.control}
              name={'quantity'}
              render={() => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-row items-center justify-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="mr-2 h-8 w-8 shrink-0 rounded-full"
                        onClick={() => {
                          form.setValue('quantity', quantity - 1)
                        }}
                        disabled={quantity <= 1}
                        type="button"
                      >
                        <Minus />
                      </Button>
                      <Input
                        className="input-no-spinner"
                        placeholder="Quantidade"
                        {...form.register('quantity')}
                        value={quantity}
                        disabled
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="ml-2 h-8 w-8 shrink-0 rounded-full"
                        onClick={() => {
                          form.setValue('quantity', quantity + 1)
                        }}
                        type="button"
                      >
                        <Plus />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'type'}
              render={() => (
                <FormItem>
                  <FormControl>
                    <Select
                      {...form.register('type')}
                      onValueChange={(value) => form.setValue('type', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="stock">Ação</SelectItem>
                          <SelectItem value="fii">Fundo Imobiliário</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton />
          </>
        }
      />
    </DrawerForm>
  )
}
