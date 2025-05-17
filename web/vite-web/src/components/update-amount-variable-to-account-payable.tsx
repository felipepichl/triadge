import { zodResolver } from '@hookform/resolvers/zod'
import { SquarePen, TrendingUpDown } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form, FormField } from '@/components/ui/form'

import { Monetary } from './generic-form-and-fields/fields/monetary'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

const updateAmountVariableToAccountPayableForm = z.object({
  amount: z.string().min(1, { message: 'Campo obrigatóriosss' }),
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

  const form = useForm<UpdateAmountVariableToAccountPayableForm>({
    resolver: zodResolver(updateAmountVariableToAccountPayableForm),
    defaultValues: {
      amount: '',
    },
  })

  function handleTogglePopover() {
    setIsPopoverOpen((prevState) => !prevState)
  }

  const handleUpdateAmountVariableToAccountPayable = useCallback(
    async ({ amount }: UpdateAmountVariableToAccountPayableForm) => {
      handleTogglePopover()

      form.reset()
    },
    [form, accountPayableId],
  )

  return (
    <Popover open={isPopoverOpen} onOpenChange={handleTogglePopover}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-none bg-transparent"
        >
          {type === 'fixed' ? (
            <SquarePen className="h-5 w-5" />
          ) : (
            <TrendingUpDown className="h-5 w-5" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-4 py-4">
        <Form {...form}>
          <form
            className="space-y-4"
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

            <Button type="submit" className="h-10 w-full">
              Atualizar
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
