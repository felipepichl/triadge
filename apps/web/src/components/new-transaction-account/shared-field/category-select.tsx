import { FieldValues, Path, useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type CategorySelectProps = {
  name: Path<FieldValues>
  onValueChange?: (value: string) => void
  onOpenChange: () => void
  placeholder: string
  options: Array<{ _id: string; description: string }>
  disabled?: boolean
  noDataMessage?: string
}

export function CategorySelect({
  name,
  onValueChange,
  onOpenChange,
  placeholder,
  options,
  disabled = false,
}: CategorySelectProps) {
  const { control, clearErrors } = useFormContext()

  return (
    <FormField
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <FormItem className="w-full">
          <FormControl>
            <Select
              onValueChange={(value) => {
                onChange(value)
                onValueChange?.(value)
                clearErrors()
              }}
              onOpenChange={onOpenChange}
              disabled={disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.length > 0 ? (
                    options.map((option) => (
                      <SelectItem key={option._id} value={option._id}>
                        {option.description}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled value="not-found">
                      Nenhum registro encontrado
                    </SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
