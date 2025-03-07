import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useMonetaryMask } from '@/hooks/use-monetary-mask'

import { DrawerForm } from '../drawer-form'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
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
  quantity: z.number().min(1, { message: 'Campo obrigatório' }),
  type: z.string().min(1, { message: 'Selecione uma opção' }),
})

type CreateAssetForm = z.infer<typeof formSchema>

export function NewAsset() {
  const { formattedValue, handleMaskChange } = useMonetaryMask()

  const form = useForm<CreateAssetForm>({
    defaultValues: {
      symbol: '',
      price: '',
      date: new Date(),
      quantity: 0,
      type: '',
    },
  })

  return (
    <DrawerForm title="Novo ativo" isOpen={true} onOpenChange={() => {}}>
      <Form {...form}>
        <form className="mt-3 space-y-4">
          <div className="space-y-2">
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
            <FormField
              control={form.control}
              name={'price'}
              render={() => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="h-10"
                      placeholder="Valor pago"
                      value={formattedValue}
                      // inputMode="numeric"
                      // type="number"
                      {...form.register('price', {
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
              name={'date'}
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
                      // onValueChange={(value) =>
                      //   setSelectedType(value === 'all' ? undefined : value)
                      // }
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
          </div>
        </form>
      </Form>
    </DrawerForm>
  )
}
