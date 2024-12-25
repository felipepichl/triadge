import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react'
import { useCallback, useState } from 'react'
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  useFormContext,
} from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type TransactionFieldProps<T extends FieldValues> = {
  control: Control<T> // Garante que T seja compatível com FieldValues
  name: Path<T> // Usa Path<T> para tipos fortemente tipados
  // selectedValue: string | null
  // onTypeChange: (type: string) => void
}

export function TransactionField<T extends FieldValues>({
  control,
  name,
}: TransactionFieldProps<T>) {
  const [selectedValue, setSelectedValue] = useState<string | null>('')
  const form = useFormContext<T>()

  const handleTypeChange = useCallback(
    (type: string) => {
      setSelectedValue(type)
      form.setValue(name, type as PathValue<T, Path<T>>)
      form.clearErrors(name)
    },
    [form, name],
  )

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormControl>
            <RadioGroup className="mx-auto grid max-w-screen-md grid-cols-2 gap-2">
              <Button
                data-current={selectedValue}
                className="h-12 w-full text-base data-[current=income]:bg-green-500 data-[current=income]:text-white sm:w-auto"
                variant="outline"
                type="button"
                onClick={() => handleTypeChange('income')}
              >
                <RadioGroupItem value="income" asChild />
                <ArrowDownCircle
                  className="mr-2"
                  color={`${selectedValue === 'income' ? '#fff' : '#00b37e'}`}
                />
                Entrada
              </Button>

              <Button
                data-current={selectedValue}
                className="h-12 w-full text-base data-[current=outcome]:bg-red-700 data-[current=outcome]:text-white sm:w-auto "
                variant="outline"
                type="button"
                onClick={() => handleTypeChange('outcome')}
              >
                <RadioGroupItem value="outcome" asChild />
                <ArrowUpCircle
                  className="mr-2"
                  color={`${selectedValue === 'outcome' ? '#fff' : '#ff0000'}`}
                />
                Saída
              </Button>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
