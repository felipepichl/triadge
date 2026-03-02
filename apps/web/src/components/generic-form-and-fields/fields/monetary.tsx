import { ChangeEvent } from 'react'
import { FieldValues, Path, useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useMonetaryMask } from '@/hooks/use-monetary-mask'

type MonetaryProps = {
  name: Path<FieldValues>
  placeholder: string
}

export function Monetary({ name, placeholder }: MonetaryProps) {
  const { control, register } = useFormContext()

  const { formattedValue, handleMaskChange } = useMonetaryMask()

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormControl>
            <Input
              className="h-10"
              placeholder={placeholder}
              value={formattedValue}
              // inputMode="numeric"
              // type="number"
              {...register(name, {
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
  )
}
