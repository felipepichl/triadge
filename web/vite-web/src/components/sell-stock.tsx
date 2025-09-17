import { HandCoins } from 'lucide-react'
import { useState } from 'react'

import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export function SellStock() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  function handleTogglePopover() {
    setIsPopoverOpen((prevState) => !prevState)
  }

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
        {/* <Form {...form}>
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
        </Form> */}
      </PopoverContent>
    </Popover>
  )
}
