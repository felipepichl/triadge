import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { FormControl, FormField, FormItem } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

import { getFieldPaths } from '../@types/filed-paths'

export function AccountPayableFiled() {
  const [isSwitchOn, setIsSwitchOn] = useState(false)

  const form = useFormContext()
  const { installments, isFixed } = getFieldPaths()

  function handleSwitchChange() {
    setIsSwitchOn(!isSwitchOn)
  }

  return (
    <div className="mx-auto grid max-w-screen-md grid-cols-1 gap-2 bg-background md:grid-cols-2">
      <FormField
        name={isFixed}
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
            <p className="text-sm">Gasto Recorrente</p>
          </span>
        )}
      />

      <FormField
        name={installments}
        control={form.control}
        render={({ field: { onChange } }) => (
          <FormItem>
            <FormControl>
              <Select onValueChange={onChange} disabled={isSwitchOn}>
                <SelectTrigger>
                  <SelectValue placeholder="Quantidade de Parcelas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Array.from({ length: 12 }, (_, index) => index + 1).map(
                      (value) => (
                        <SelectItem key={value} value={value.toString()}>
                          {value}
                        </SelectItem>
                      ),
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  )
}
