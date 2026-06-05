import { zodResolver } from '@hookform/resolvers/zod'
import { HandCoins, Loader2, Minus, Plus } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

import { useSellStock } from '@/features/stock/hooks/use-stock-mutations'
import { parseCurrency } from '@/shared/util/formatter'

import { Monetary } from '@/shared/components/generic-form-and-fields/fields/monetary'
import { Button } from '@/shared/components/ui/button'
import { CardDescription } from '@/shared/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover'
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

  const sellStock = useSellStock()

  const form = useForm<SellStockForm>({
    resolver: zodResolver(sellStockForm),
    defaultValues: {
      quantity: 0,
      amount: '',
    },
  })

  const quantity = Number(form.watch('quantity')) || 0

  function handleTogglePopover() {
    setIsPopoverOpen((prevState) => !prevState)
  }

  const handleSellStock = useCallback(
    async ({ quantity, amount }: SellStockForm) => {
      try {
        const formattedAmount = parseCurrency(amount)

        if (amount && quantity > 0) {
          await sellStock.mutateAsync({
            symbol,
            price: formattedAmount,
            quantity,
          })
        } else {
          await sellStock.mutateAsync({
            symbol,
            price: quote,
            quantity,
          })
        }

        handleTogglePopover()
        form.reset()
        toast.success('Venda realizada com sucesso!')
      } catch {
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
                          const newQuantity = quantity - 1
                          form.setValue('quantity', Math.max(0, newQuantity))
                        }}
                        disabled={quantity <= 0}
                        type="button"
                      >
                        <Minus />
                      </Button>
                      <Input
                        className="input-no-spinner"
                        placeholder="Quantidade"
                        {...form.register('quantity', { valueAsNumber: true })}
                        readOnly
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="ml-2 h-8 w-8 shrink-0 rounded-full"
                        onClick={() => {
                          const newQuantity = quantity + 1
                          form.setValue(
                            'quantity',
                            Math.min(position, newQuantity),
                          )
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

            <Button
              disabled={sellStock.isPending}
              type="submit"
              className="h-10 w-full"
            >
              {sellStock.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span className="font-semibold">Vendendo...</span>
                </>
              ) : (
                <span className="font-semibold">Vender</span>
              )}
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
