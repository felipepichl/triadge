import { zodResolver } from '@hookform/resolvers/zod'
import { SquarePen } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Form, FormField } from '@/components/ui/form'
import { useAccountPayable } from '@/hooks/use-account-payable'

import { Monetary } from './generic-form-and-fields/fields/monetary'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Switch } from './ui/switch'

const updateAmountVariableToAccountPayableForm = z.object({
  amount: z.string().min(1, { message: 'Campo obrigatórios' }),
  interest: z.boolean().default(false),
})

type UpdateAmountVariableToAccountPayableForm = z.infer<
  typeof updateAmountVariableToAccountPayableForm
>

type UpdateAmountVariableToAccountPayableProps = {
  type: 'fixed' | 'unfixed'
  accountPayableId: string
}

export function UpdateAmountVariableToAccountPayable({
  type,
  accountPayableId,
}: UpdateAmountVariableToAccountPayableProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isSwitchOn, setIsSwitchOn] = useState(false)

  const { updateAmountVariableToAccountPayable } = useAccountPayable()

  const form = useForm<UpdateAmountVariableToAccountPayableForm>({
    resolver: zodResolver(updateAmountVariableToAccountPayableForm),
    defaultValues: {
      amount: '',
      interest: false,
    },
  })

  function handleTogglePopover() {
    setIsPopoverOpen((prevState) => !prevState)
  }

  function handleSwitchChange() {
    setIsSwitchOn(!isSwitchOn)
  }

  const handleUpdateAmountVariableToAccountPayable = useCallback(
    async ({ amount }: UpdateAmountVariableToAccountPayableForm) => {
      try {
        const formattedAmount = parseFloat(
          amount.replace('R$ ', '').replace('.', '').replace(',', '.'),
        )

        if (isSwitchOn) {
          console.log('select')
        } else {
          updateAmountVariableToAccountPayable({
            amount: formattedAmount,
            accountPayableId,
          })
        }

        handleTogglePopover()
        form.reset()
        toast.success('Valor atualizado com sucesso!')
      } catch (err) {
        console.log(err)
        toast.error('Erro ao autualizar, tente novamente mais tarde!')
      }
    },
    [form, accountPayableId, updateAmountVariableToAccountPayable, isSwitchOn],
  )

  return (
    <Popover open={isPopoverOpen} onOpenChange={handleTogglePopover}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-none bg-transparent"
        >
          <SquarePen className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-4 py-4">
        <Form {...form}>
          <form
            className="space-y-2"
            onSubmit={form.handleSubmit(
              handleUpdateAmountVariableToAccountPayable,
            )}
          >
            <FormField
              control={form.control}
              name="amount"
              render={() => (
                <Monetary placeholder="Atualizar valor base" name="amount" />
              )}
            />

            <FormField
              name="interest"
              control={form.control}
              render={({ field: { onChange, value } }) => (
                <span className="flex min-h-10 items-center rounded-md border bg-background">
                  <Switch
                    className="ml-3 mr-3"
                    checked={value}
                    onCheckedChange={(value) => {
                      onChange(value)
                      handleSwitchChange()
                    }}
                  />
                  <p className="text-sm">Pagamento com juros</p>
                </span>
              )}
            />

            <Button type="submit" className="h-10 w-full">
              Atualizar
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
