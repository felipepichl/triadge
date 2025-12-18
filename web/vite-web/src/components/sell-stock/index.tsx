import { zodResolver } from '@hookform/resolvers/zod'
import { HandCoins, Minus, Plus } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

import { useStock } from '@/hooks/use-stock'

import { Monetary } from '../generic-form-and-fields/fields/monetary'
import { Button } from '../ui/button'
import { CardDescription } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { InfoRow } from './info-row'

const sellStockForm = z.object({
  quantity: z.number().min(1, { message: 'Adicione a quantidade' }),
  amount: z.string(),
})

type SellStockForm = z.infer<typeof sellStockForm>

type SellStockProps = {
  symbol: string
  position: number
  quote: number
}

export function SellStock({ symbol, position, quote }: SellStockProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [quantity, setQuantity] = useState(0)

  const { sellStock } = useStock()

  const form = useForm<SellStockForm>({
    resolver: zodResolver(sellStockForm),
    defaultValues: {
      quantity: 0,
      amount: '',
    },
  })

  function handleTogglePopover() {
    setIsPopoverOpen((prevState) => !prevState)
  }

  const handleSellStock = useCallback(
    async ({ quantity, amount }: SellStockForm) => {
      try {
        const formattedAmount = parseFloat(
          amount.replace('R$ ', '').replace('.', '').replace(',', '.'),
        )

        if (amount && quantity > 0) {
          console.log('Chama a rota e passa amount:', quantity, amount)

          await sellStock({
            symbol,
            price: formattedAmount,
            quantity,
          })

          handleTogglePopover()
          form.reset()
          toast.success('Venda realizada com sucesso!')
        } else {
          console.log('Chama a rota e passa quote:', quantity, quote, amount)

          await sellStock({
            symbol,
            price: quote,
            quantity,
          })

          handleTogglePopover()
          form.reset()
          toast.success('Venda realizada com sucesso!')
        }
      } catch (err) {
        console.log(err)
        toast.error('Erro ao vender, tente novamente mais tarde!')
      }
    },
    [symbol, quote, form, sellStock],
  )

  return (
    <Popover open={isPopoverOpen} onOpenChange={handleTogglePopover}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-none bg-transparent"
        >
          <HandCoins className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-4 py-4">
        <Form {...form}>
          <form
            className="space-y-3"
            onSubmit={form.handleSubmit(handleSellStock)}
          >
            <CardDescription className="truncate font-semibold text-gray-500 dark:text-slate-200">
              Nova Venda
            </CardDescription>

            <InfoRow label="Cotação Atual:" value={quote} isValueFormatted />
            <InfoRow label="Posição:" value={position - quantity} />

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
                          setQuantity(quantity - 1)
                          form.setValue('quantity', quantity - 1)
                        }}
                        disabled={quantity <= 0}
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
                          setQuantity(quantity + 1)
                          form.setValue('quantity', quantity + 1)
                        }}
                        disabled={quantity >= position}
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

            <Monetary placeholder="Valor da venda" name="amount" />

            <Button type="submit" className="h-10 w-full">
              Vender
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
