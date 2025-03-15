import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useStock } from '@/hooks/use-stock'

import { DrawerForm } from '../drawer-form'
import { DatePicker } from '../generic-form-and-fields/fields/data-picker'
import { Monetary } from '../generic-form-and-fields/fields/monetary'
import { GenericForm } from '../generic-form-and-fields/generic-form'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const formSchema = z.object({
  symbol: z.string().min(1, { message: 'Campo obrigatório' }),
  price: z.string().min(1, { message: 'Campo obrigatório' }),
  date: z.date(),
  quantity: z.string().min(1, { message: 'Campo obrigatório' }),
  type: z.string().min(1, { message: 'Selecione uma opção' }),
})

type CreateAssetForm = z.infer<typeof formSchema>

export function NewStock() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean | undefined>(
    undefined,
  )

  const { createStock } = useStock()

  const form = useForm<CreateAssetForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symbol: '',
      price: '',
      date: new Date(),
      quantity: '',
      type: '',
    },
  })

  const handleToggleDrawer = useCallback(() => {
    setIsDrawerOpen((prevState) => !prevState)
  }, [])

  const handleCreateNewAsset = useCallback(
    async ({ symbol, price, date, quantity, type }: CreateAssetForm) => {
      try {
        const data = {
          symbol,
          price: parseFloat(
            price.replace('R$ ', '').replace('.', '').replace(',', '.'),
          ),
          date,
          quantity: Number(quantity),
          type,
        }

        await createStock(data)
        handleToggleDrawer()
        form.reset()
        toast.success('Ativo salvo com sucesso!')
      } catch (error) {
        toast.error('Erro ao salvar, tente novamente mais tarde!')
      }
    },
    [createStock, handleToggleDrawer, form],
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
                    <Input
                      placeholder="Quantidade"
                      {...form.register('quantity')}
                    />
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
          </>
        }
      />
    </DrawerForm>
  )
}
